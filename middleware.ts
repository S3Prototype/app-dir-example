import { NextResponse } from 'next/server';
import { SplitFactory, PluggableStorage, ErrorLogger } from '@splitsoftware/splitio-browserjs';
import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
import { createClient } from '@vercel/edge-config';

export const config = {
  // Run only on /marketing
  matcher: '/marketing',
};
 
export async function middleware(request: Request) {
  const {
    SPLIT_EDGE_CONFIG_ITEM_KEY,
    SPLIT_SDK_KEY
  } = process.env;
  if(!SPLIT_SDK_KEY || !SPLIT_EDGE_CONFIG_ITEM_KEY)
    return NextResponse.next();
  
  const edgeConfigClient = createClient(process.env.EDGE_CONFIG);
  const { searchParams } = new URL(request.url);
  const userKey = searchParams.get('userKey') || 'anonymous';
    const client = SplitFactory({
      core: {
        authorizationKey: SPLIT_SDK_KEY,
        key: userKey
      },
      mode: 'consumer_partial',
      storage: PluggableStorage({
        wrapper: EdgeConfigWrapper({
          // The Edge Config item key where Split stores
          // feature flag definitions
          edgeConfigItemKey: SPLIT_EDGE_CONFIG_ITEM_KEY,
          // The Edge Config client
          edgeConfig: edgeConfigClient,
        })
      }),
      // Disable or keep only ERROR log level in production,
      // to minimize performance impact
      debug: ErrorLogger(),
    }).client();

    // Replace this with the feature flag you want
    const FEATURE_FLAG = 'New_Marketing_Page';
    const treatment = await client.getTreatment(FEATURE_FLAG)

    await client.destroy()

  return treatment === 'on' ? 
    NextResponse.rewrite(new URL('/marketing/a', request.url)) :
    NextResponse.rewrite(new URL('/marketing/b', request.url));
}