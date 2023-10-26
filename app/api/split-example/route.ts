import { SplitFactory, PluggableStorage, ErrorLogger } from '@splitsoftware/splitio-browserjs';
import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
import { createClient } from '@vercel/edge-config';
 
export async function GET(request: Request) {
  const {
    EDGE_CONFIG_SPLIT_ITEM_KEY,
    SPLIT_SDK_CLIENT_API_KEY
  } = process.env;


  if(!SPLIT_SDK_CLIENT_API_KEY || !EDGE_CONFIG_SPLIT_ITEM_KEY)
    return new Response(
      `Failed to find your SDK Key (${SPLIT_SDK_CLIENT_API_KEY})
      or item key ${EDGE_CONFIG_SPLIT_ITEM_KEY}`
    );
  
  const edgeConfigClient = createClient(process.env.EDGE_CONFIG);
  const { searchParams } = new URL(request.url);
  const userKey = searchParams.get('userKey') || 'anonymous';
  const client = SplitFactory({
    core: {
      authorizationKey: SPLIT_SDK_CLIENT_API_KEY,
      key: userKey
    },
    mode: 'consumer_partial',
    storage: PluggableStorage({
      wrapper: EdgeConfigWrapper({
        // The Edge Config item key where Split stores
        // feature flag definitions
        edgeConfigItemKey: EDGE_CONFIG_SPLIT_ITEM_KEY,
        // The Edge Config client
        edgeConfig: edgeConfigClient,
      })
    }),
    // Disable or keep only ERROR log level in production,
    // to minimize performance impact
    debug: ErrorLogger(),
  }).client();

  await new Promise(resolve => {
    client.on(client.Event.SDK_READY, ()=>resolve);
    client.on(client.Event.SDK_READY_TIMED_OUT, ()=>resolve);
  });

  // Replace this with the feature flag you want
  const FEATURE_FLAG = 'New_Marketing_Page';
  const treatment = await client.getTreatment(FEATURE_FLAG)

  // Must await in app-router; waitUntil() is not
  // yet supported
  await client.destroy()

  // treatment will be 'control' if userKey is neither
  // Bobby nor Joe, or if the SDK timed out
  if(treatment == 'control')
    return new Response('Control marketing page');

  return treatment === 'on' ? 
    new Response('New marketing page') :
    new Response('Old marketing page');
}

export const runtime = 'edge';