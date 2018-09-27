/**
 * Setup apollo-link-state
 * Apollo-link-state helps to manage a local store for caching and client-side
 * data storing
 * It replaces previous implementation using redux
 * Link state doc:
 * @see https://www.apollographql.com/docs/react/essentials/local-state.html
 * @see https://www.apollographql.com/docs/link/links/state.html
 * General presentation on Links
 * @see https://www.apollographql.com/docs/link/
 * Example
 * @see https://hackernoon.com/storing-local-state-in-react-with-apollo-link-state-738f6ca45569
 */
import { withClientState } from 'apollo-link-state';

/**
 * Create a state link
 */
export const createStateLink = ({ cache, resolvers, defaults, ...otherOptions }) => {
  const stateLink = withClientState({
    cache,
    defaults: defaults || getDefaults(),
    resolvers: resolvers || getResolvers(),
    ...otherOptions
  });
  return stateLink;
};

// enhancement workflow
const registeredDefaults = {};
/**
 * Defaults are default response to queries
 */
export const registerDefault = ({ name, defaultValue, options = {} }) => {
  registeredDefaults[name] = defaultValue;
  return registeredDefaults;
};
export const getDefaults = () => registeredDefaults;

// Mutation are equivalent to a Redux Action + Reducer
// except it uses GraphQL to retrieve/update data in the cache
const registeredMutations = {};
export const registerMutation = ({ name, mutation, options = {} }) => {
  registeredMutations[name] = mutation;
  return registeredMutations;
};
export const getMutations = () => registeredMutations;

export const getResolvers = () => ({
  Mutation: getMutations()
});
