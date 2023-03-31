import { request, RequestDocument } from 'graphql-request';
import { getGraphUrl } from '../config';
import { CHAINS } from '../../sdk';

export const subgraphFetch = async <R = any>(
  query: RequestDocument,
  chainId: CHAINS,
  vars = {},
  // monitoring = false,
) => await request<R>(getGraphUrl(chainId), query, vars);
