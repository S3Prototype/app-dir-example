/* eslint-disable */

import * as sdk from "hypertune";
const token = `U2FsdGVkX18Z+9YxxGamz9zK250WDwvDq52Ae8vqTCc=`;
const queryCode = `query InitQuery {
  root {
    showNewEditor
  }
}`;

const query = {"Query":{"objectTypeName":"Query","selection":{"root":{"fieldArguments":{"__isPartialObject__":true},"fieldQuery":{"Root":{"objectTypeName":"Root","selection":{"showNewEditor":{"fieldArguments":{},"fieldQuery":null}}}}}}}};

const fallbackInitData: sdk.FallbackInitData & { [key: string]: unknown } = {"commitId":3782,"reducedExpression":{"id":"wtO3S3iimMnMqpe2t5G6N","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"root":{"id":"PtRm06QhpbO4cLJewgL4m","body":{"id":"Xx1KnpYOXraRPzZe-cB45","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ObjectExpression","fields":{"showNewEditor":{"id":"S5ATB3VMjE-J0zsp2B0eP","logs":{"evaluations":{"IU666vMfws6UibS1PjGcb":1},"events":{},"exposures":{}},"type":"SwitchExpression","cases":[{"when":{"a":{"id":"CZaWY_NzdauBEigoKbDVU","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"GetFieldExpression","object":{"id":"XbFSygAtD5zgkoYPd3Pgq","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"VariableExpression","valueType":{"type":"ObjectValueType","objectTypeName":"Query_root_args"},"variableId":"5V8wqKn1jLxhsxcAYWbH9"},"fieldPath":"context > user > id","valueType":{"type":"StringValueType"}},"b":{"id":"LcPsNj3ALkJxCIBpDuf8z","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ListExpression","items":[{"id":"B_rSoB5ag-WMdKb-pUrXM","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"StringExpression","value":"test_id","valueType":{"type":"StringValueType"}}],"valueType":{"type":"ListValueType","itemValueType":{"type":"StringValueType"}}},"id":"dyBUk2V9JwMwFkrWITeAD","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"ComparisonExpression","operator":"in","valueType":{"type":"BooleanValueType"}},"then":{"id":"olP-QjRGf4FBKZ1m-vsHS","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"BooleanExpression","value":true,"valueType":{"type":"BooleanValueType"}}}],"control":{"id":"Oj4CPplyTeu-vm9WLupzq","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"BooleanExpression","value":true,"valueType":{"type":"BooleanValueType"}},"default":{"id":"sB94BMikkCr06Ygo0SwsZ","logs":{"events":{},"exposures":{},"evaluations":{}},"type":"BooleanExpression","value":false,"valueType":{"type":"BooleanValueType"}},"valueType":{"type":"BooleanValueType"}}},"valueType":{"type":"ObjectValueType","objectTypeName":"Root"},"objectTypeName":"Root"},"logs":{"events":{},"exposures":{},"evaluations":{}},"type":"FunctionExpression","valueType":{"type":"FunctionValueType","returnValueType":{"type":"ObjectValueType","objectTypeName":"Root"},"parameterValueTypes":[{"type":"ObjectValueType","objectTypeName":"Query_root_args"}]},"parameters":[{"id":"5V8wqKn1jLxhsxcAYWbH9","name":"rootArgs"}]}},"metadata":{"permissions":{"user":{},"group":{"team":{"write":"allow"}}}},"valueType":{"type":"ObjectValueType","objectTypeName":"Query"},"objectTypeName":"Query"},"splits":{},"eventTypes":{},"commitConfig":{"splitConfig":{}},"initLogId":0,"commitHash":"3566657283003444","sdkConfig":{"hashPollInterval":1000,"flushLogsInterval":1000,"maxLogsPerFlush":1},"query":{"Query":{"objectTypeName":"Query","selection":{"root":{"fieldArguments":{"__isPartialObject__":true},"fieldQuery":{"Root":{"objectTypeName":"Root","selection":{"showNewEditor":{"fieldArguments":{},"fieldQuery":null}}}}}}}}};

export function initializeHypertune(
  variableValues: Rec,
  options: sdk.InitializeOptions = {}
): QueryNode {
  const defaultOptions = {
    query
    ,token
    ,queryCode
    ,variableValues
    ,fallbackInitData
  };

  return sdk.initialize(
    QueryNode,
    
    { ...defaultOptions, ...options }
  );
}

// Enum types


  
// Input object types

export type Rec = {
      
      //
      };

export type Rec2 = {
      context: Rec3;
      //
      };

export type Rec3 = {
      user: Rec4;
      //
      };

export type Rec4 = {
      id: string;
name: string;
email: string;
      //
      };
  
// Enum node classes


  
// Fragment node classes

export class QueryNode extends sdk.Node {
      typeName = "Query" as const;
  
      root(args: Rec2): RootNode {
          const props0 = this.getField("root", args);
          const expression0 = props0.expression;
  
          if (
      expression0 &&
      expression0.type === "ObjectExpression"
      && expression0.objectTypeName === "Root"
    ) {
      return new RootNode(props0);
    }
  
    const node = new RootNode(props0);
    node._logUnexpectedTypeError();
    return node;
      }
      }

export class RootNode extends sdk.Node {
      typeName = "Root" as const;
  
      showNewEditor(args: Rec = {}): sdk.BooleanNode {
          const props0 = this.getField("showNewEditor", args);
          const expression0 = props0.expression;
  
          if (
      expression0 &&
      expression0.type === "BooleanExpression"
      
    ) {
      return new sdk.BooleanNode(props0);
    }
  
    const node = new sdk.BooleanNode(props0);
    node._logUnexpectedTypeError();
    return node;
      }
      }