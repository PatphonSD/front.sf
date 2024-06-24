import NodeCache from "node-cache";

export const kv = new NodeCache({useClones : true});