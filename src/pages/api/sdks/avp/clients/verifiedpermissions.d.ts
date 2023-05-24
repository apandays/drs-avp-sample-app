import {Request} from '../lib/request';
import {Response} from '../lib/response';
import {AWSError} from '../lib/error';
import {Service} from '../lib/service';
import {ServiceConfigurationOptions} from '../lib/service';
import {ConfigBase as Config} from '../lib/config-base';
interface Blob {}
declare class VerifiedPermissions extends Service {
  /**
   * Constructs a service object. This object has one method for each API operation.
   */
  constructor(options?: VerifiedPermissions.Types.ClientConfiguration)
  config: Config & VerifiedPermissions.Types.ClientConfiguration;
  /**
   * Creates a policy in the specified PolicyStore.
   */
  createPolicy(params: VerifiedPermissions.Types.CreatePolicyInput, callback?: (err: AWSError, data: VerifiedPermissions.Types.CreatePolicyOutput) => void): Request<VerifiedPermissions.Types.CreatePolicyOutput, AWSError>;
  /**
   * Creates a policy in the specified PolicyStore.
   */
  createPolicy(callback?: (err: AWSError, data: VerifiedPermissions.Types.CreatePolicyOutput) => void): Request<VerifiedPermissions.Types.CreatePolicyOutput, AWSError>;
  /**
   * Creates a PolicyStore. A PolicyStore is a container for policy resources. You can create one PolicyStore per AWS account.
   */
  createPolicyStore(params: VerifiedPermissions.Types.CreatePolicyStoreInput, callback?: (err: AWSError, data: VerifiedPermissions.Types.CreatePolicyStoreOutput) => void): Request<VerifiedPermissions.Types.CreatePolicyStoreOutput, AWSError>;
  /**
   * Creates a PolicyStore. A PolicyStore is a container for policy resources. You can create one PolicyStore per AWS account.
   */
  createPolicyStore(callback?: (err: AWSError, data: VerifiedPermissions.Types.CreatePolicyStoreOutput) => void): Request<VerifiedPermissions.Types.CreatePolicyStoreOutput, AWSError>;
  /**
   * Deletes the specified policy. If you specify a policy that does not exist, the request response will still return a successful HTTP 200 status code. If you specify a PolicyStore that does not exit, the request response will return a client error HTTP 404 status code.
   */
  deletePolicy(params: VerifiedPermissions.Types.DeletePolicyInput, callback?: (err: AWSError, data: VerifiedPermissions.Types.DeletePolicyOutput) => void): Request<VerifiedPermissions.Types.DeletePolicyOutput, AWSError>;
  /**
   * Deletes the specified policy. If you specify a policy that does not exist, the request response will still return a successful HTTP 200 status code. If you specify a PolicyStore that does not exit, the request response will return a client error HTTP 404 status code.
   */
  deletePolicy(callback?: (err: AWSError, data: VerifiedPermissions.Types.DeletePolicyOutput) => void): Request<VerifiedPermissions.Types.DeletePolicyOutput, AWSError>;
  /**
   * Deletes the specified PolicyStore. If you specify a PolicyStore that does not exist, the request response will still return a successful HTTP 200 status code.
   */
  deletePolicyStore(params: VerifiedPermissions.Types.DeletePolicyStoreInput, callback?: (err: AWSError, data: VerifiedPermissions.Types.DeletePolicyStoreOutput) => void): Request<VerifiedPermissions.Types.DeletePolicyStoreOutput, AWSError>;
  /**
   * Deletes the specified PolicyStore. If you specify a PolicyStore that does not exist, the request response will still return a successful HTTP 200 status code.
   */
  deletePolicyStore(callback?: (err: AWSError, data: VerifiedPermissions.Types.DeletePolicyStoreOutput) => void): Request<VerifiedPermissions.Types.DeletePolicyStoreOutput, AWSError>;
  /**
   * Retrieves information about the specified policy, including the policy Id and the Id of the PolicyStore where the policy you want information about is stored.
   */
  getPolicy(params: VerifiedPermissions.Types.GetPolicyInput, callback?: (err: AWSError, data: VerifiedPermissions.Types.GetPolicyOutput) => void): Request<VerifiedPermissions.Types.GetPolicyOutput, AWSError>;
  /**
   * Retrieves information about the specified policy, including the policy Id and the Id of the PolicyStore where the policy you want information about is stored.
   */
  getPolicy(callback?: (err: AWSError, data: VerifiedPermissions.Types.GetPolicyOutput) => void): Request<VerifiedPermissions.Types.GetPolicyOutput, AWSError>;
  /**
   * An API operation that makes an authorization decision using both input and preconfigured policies. All determining policies will be used to make the authorization decision.
   */
  isAuthorized(params: VerifiedPermissions.Types.IsAuthorizedInput, callback?: (err: AWSError, data: VerifiedPermissions.Types.IsAuthorizedOutput) => void): Request<VerifiedPermissions.Types.IsAuthorizedOutput, AWSError>;
  /**
   * An API operation that makes an authorization decision using both input and preconfigured policies. All determining policies will be used to make the authorization decision.
   */
  isAuthorized(callback?: (err: AWSError, data: VerifiedPermissions.Types.IsAuthorizedOutput) => void): Request<VerifiedPermissions.Types.IsAuthorizedOutput, AWSError>;
  /**
   * Lists all policies stored in the specified PolicyStore.
   */
  listPolicies(params: VerifiedPermissions.Types.ListPoliciesInput, callback?: (err: AWSError, data: VerifiedPermissions.Types.ListPoliciesOutput) => void): Request<VerifiedPermissions.Types.ListPoliciesOutput, AWSError>;
  /**
   * Lists all policies stored in the specified PolicyStore.
   */
  listPolicies(callback?: (err: AWSError, data: VerifiedPermissions.Types.ListPoliciesOutput) => void): Request<VerifiedPermissions.Types.ListPoliciesOutput, AWSError>;
  /**
   * Lists all PolicyStores.
   */
  listPolicyStores(params: VerifiedPermissions.Types.ListPolicyStoresInput, callback?: (err: AWSError, data: VerifiedPermissions.Types.ListPolicyStoresOutput) => void): Request<VerifiedPermissions.Types.ListPolicyStoresOutput, AWSError>;
  /**
   * Lists all PolicyStores.
   */
  listPolicyStores(callback?: (err: AWSError, data: VerifiedPermissions.Types.ListPolicyStoresOutput) => void): Request<VerifiedPermissions.Types.ListPolicyStoresOutput, AWSError>;
}
declare namespace VerifiedPermissions {
  export type ActionId = string;
  export interface ActionIdentifier {
    /**
     * The Id of an Action.
     */
    ActionId: ActionId;
    /**
     * The type of an Action.
     */
    ActionType: ActionType;
  }
  export type ActionType = string;
  export interface AttributeValue {
    /**
     * An attribute value of Boolean type.
     */
    Boolean?: BooleanAttribute;
    /**
     * An attribute value of EntityIdentifier type.
     */
    EntityIdentifier?: EntityIdentifier;
    /**
     * An attribute value of Long type.
     */
    Long?: LongAttribute;
    /**
     * An attribute value of Record type.
     */
    Record?: RecordAttribute;
    /**
     * An attribute value of Set type.
     */
    Set?: SetAttribute;
    /**
     * An attribute value of String type.
     */
    String?: StringAttribute;
  }
  export type Boolean = boolean;
  export type BooleanAttribute = boolean;
  export type Context = {[key: string]: AttributeValue};
  export interface CreatePolicyInput {
    /**
     * The ClientToken is used for idempotency control. Idempotency ensures that an API request completes no more than one time. With an idempotent request, if the original request completes successfully, any subsequent retries complete successfully without performing any further actions. However, the result might contain updated information, such as the current creation status. To make an idempotent API request, specify a client token in the request. You shouldn't reuse the same client token for other API requests. If you retry a request that completed successfully using the same client token and the same parameters, the retry succeeds without performing any further actions. If you retry a successful request using the same client token, but one or more of the parameters are different, the retry fails with an IdempotentParameterMismatch error.
     */
    ClientToken?: IdempotencyToken;
    /**
     * The policy type and content you want to use for the new policy. The policy content is written in Cedar language. The following policy type is supported:   InlinePolicy  
     */
    PolicyDefinition: PolicyDefinition;
    /**
     * The PolicyStoreId of the PolicyStore you want to create the policy in.
     */
    PolicyStoreIdentifier: PolicyStoreId;
  }
  export interface CreatePolicyOutput {
    /**
     * The Amazon Resource Name (ARN) of the policy.
     */
    Arn: ResourceArn;
    /**
     * The date and time the policy was created.
     */
    CreatedDate: TimestampFormat;
    /**
     * The date and time the policy was last updated.
     */
    LastUpdatedDate: TimestampFormat;
    /**
     * The identifier of the created policy.
     */
    PolicyId: PolicyId;
    /**
     * The identifier of the PolicyStore that the policy was created in.
     */
    PolicyStoreId: PolicyStoreId;
    /**
     * The policy type of the created policy.
     */
    PolicyType: PolicyType;
    /**
     * The principal specified in the policy scope. This is an optional response element when the Principal is unspecified.
     */
    Principal?: EntityIdentifier;
    /**
     * The resource specified in the policy scope. This is an optional response element when the Resource is unspecified.
     */
    Resource?: EntityIdentifier;
  }
  export interface CreatePolicyStoreInput {
    /**
     * The ClientToken is used for idempotency control. Idempotency ensures that an API request completes no more than one time. With an idempotent request, if the original request completes successfully, any subsequent retries complete successfully without performing any further actions. However, the result might contain updated information, such as the current creation status. To make an idempotent API request, specify a client token in the request. You shouldn't reuse the same client token for other API requests. If you retry a request that completed successfully using the same client token and the same parameters, the retry succeeds without performing any further actions. If you retry a successful request using the same client token, but one or more of the parameters are different, the retry fails with an IdempotentParameterMismatch error.
     */
    ClientToken?: IdempotencyToken;
  }
  export interface CreatePolicyStoreOutput {
    /**
     * The Amazon Resource Name (ARN) of the PolicyStore.
     */
    Arn: ResourceArn;
    /**
     * The date and time the PolicyStore was created.
     */
    CreatedDate: TimestampFormat;
    /**
     * The identifier of the created PolicyStore.
     */
    PolicyStoreId: PolicyStoreId;
  }
  export type Decision = "Allow"|"Deny"|string;
  export interface DeletePolicyInput {
    /**
     * The identifier of the policy you want to delete.
     */
    PolicyIdentifier: PolicyId;
    /**
     * The identifier of the PolicyStore where the policy you want to delete is stored.
     */
    PolicyStoreIdentifier: PolicyStoreId;
  }
  export interface DeletePolicyOutput {
  }
  export interface DeletePolicyStoreInput {
    /**
     * The identifier of the PolicyStore you want to delete.
     */
    PolicyStoreIdentifier: PolicyStoreId;
  }
  export interface DeletePolicyStoreOutput {
  }
  export interface DeterminingPolicyItem {
    /**
     * The identifier of a policy that determined to an authorization decision.
     */
    DeterminingPolicyIdentifier?: PolicyId;
  }
  export type DeterminingPolicyList = DeterminingPolicyItem[];
  export type EntitiesList = EntityItem[];
  export type EntityAttributes = {[key: string]: AttributeValue};
  export type EntityId = string;
  export interface EntityIdentifier {
    /**
     * The identifier of an entity.
     */
    EntityId: EntityId;
    /**
     * The type of an entity.
     */
    EntityType: EntityType;
  }
  export interface EntityItem {
    /**
     * A list of attributes for an EntityItem.
     */
    Attributes?: EntityAttributes;
    /**
     * The identifier of an entity item.
     */
    Identifier: EntityIdentifier;
    /**
     * The parents of an entity item
     */
    Parents?: ParentList;
  }
  export interface EntityReference {
    /**
     * The identifier, which consists of an EntityType and EntityId, of a principal or resource.
     */
    Identifier?: EntityIdentifier;
    /**
     * Used to indicate that a principal or resource is not specified. This can be used to search for policies that are not associated with a specific principal or resource.
     */
    Unspecified?: Boolean;
  }
  export type EntityType = string;
  export type EvaluationErrorList = EvaluationErrorListItem[];
  export interface EvaluationErrorListItem {
    /**
     * The error description.
     */
    ErrorDescription?: String;
  }
  export interface GetPolicyInput {
    /**
     * The identifier of the policy you want information about.
     */
    PolicyIdentifier: PolicyId;
    /**
     * The identifier of the PolicyStore where the policy you want information about is stored.
     */
    PolicyStoreIdentifier: PolicyStoreId;
  }
  export interface GetPolicyOutput {
    /**
     * The Amazon Resource Name (ARN) of the policy.
     */
    Arn: ResourceArn;
    /**
     * The date and time the policy was created.
     */
    CreatedDate: TimestampFormat;
    /**
     * The date and time the policy was last updated.
     */
    LastUpdatedDate: TimestampFormat;
    /**
     * The definition of the policy requested.
     */
    PolicyDefinition: PolicyDefinitionDetail;
    /**
     * The identifier of the policy you want information about.
     */
    PolicyId: PolicyId;
    /**
     * The identifier of the PolicyStore where the policy you want information about is stored.
     */
    PolicyStoreId: PolicyStoreId;
    /**
     * The policy type of the policy.
     */
    PolicyType: PolicyType;
    /**
     * The principal specified in the policy. This is an optional response element when the Principal is unspecified.
     */
    Principal?: EntityIdentifier;
    /**
     * The resource specified in the policy. This is an optional response element when the Resource is unspecified.
     */
    Resource?: EntityIdentifier;
  }
  export type IdempotencyToken = string;
  export interface InlinePolicy {
    /**
     * A description of the inline policy.
     */
    Description?: InlinePolicyDescription;
    /**
     * The content of policy written in Cedar language.
     */
    PolicyBody: PolicyBody;
  }
  export type InlinePolicyDescription = string;
  export interface InlinePolicyDetail {
    /**
     * The description of the inline policy.
     */
    Description?: InlinePolicyDescription;
    /**
     * The policy content of the inline policy.
     */
    PolicyBody: PolicyBody;
  }
  export interface InlinePolicyItem {
    /**
     * The description of the inline policy.
     */
    Description?: InlinePolicyDescription;
  }
  export interface IsAuthorizedInput {
    /**
     * The action for which the authorization decision is made. For example, is the principal allowed to perform the action on the resource.
     */
    Action?: ActionIdentifier;
    /**
     * The runtime context to be used for making authorization decisions.
     */
    Context?: Context;
    /**
     * The identifier of the policy store. Policies in this policy store will be used to make an authorization decision for the input.
     */
    PolicyStoreIdentifier: PolicyStoreId;
    /**
     * The principal for which the authorization decision is made. For example, is the principal allowed to perform the action on the resource.
     */
    Principal?: EntityIdentifier;
    /**
     * The resource for which the authorization decision is made. For example, is the principal allowed to perform the action on the resource.
     */
    Resource?: EntityIdentifier;
    /**
     * Input slice data that is used to make the authorization decision. The slice is the subset of policies and entity data used to evaluate a specific authorization request. For example, groups to which the principal belongs.
     */
    SliceComplement?: SliceComplement;
  }
  export interface IsAuthorizedOutput {
    /**
     * An authorization decision that indicates if the authorization request should be allowed or denied.
     */
    Decision?: Decision;
    /**
     * The list of determining policies used to make the authorization decision. For example, if there are two matching policies, where one is a forbid and the other is a permit, then the forbid policy will be the determining policy. In the case of multiple matching permit policies then there would be multiple determining policies. In the case that no policies match, and hence the response is DENY, there would be no determining policies.
     */
    DeterminingPolicies?: DeterminingPolicyList;
    /**
     * Errors that occurred while making an authorization decision, for example, a policy references an Entity or entity Attribute that does not exist in the slice.
     */
    Errors?: EvaluationErrorList;
  }
  export interface ListPoliciesInput {
    /**
     * Filter used to list policies that match a certain criteria. For example, list policies for a specific principal.
     */
    Filter?: PolicyFilter;
    /**
     * The maximum number of results to include in the response. If more results exist than the specified MaxResults value, a token is included in the response so that the remaining paginated results can be retrieved.
     */
    MaxResults?: MaxResults;
    /**
     * An optional token returned from a prior request. Use this token for pagination of results from this action. If this parameter is specified, the response includes only results beyond the token, up to the value specified by MaxResults.
     */
    NextToken?: NextToken;
    /**
     * The identifier of the PolicyStore you want to list policies from.
     */
    PolicyStoreIdentifier: PolicyStoreId;
  }
  export interface ListPoliciesOutput {
    /**
     * Provides an identifier to allow retrieval of paginated results.
     */
    NextToken?: NextToken;
    /**
     * Lists all policies that are available in the specified PolicyStore.
     */
    Policies: PolicyList;
  }
  export interface ListPolicyStoresInput {
    /**
     * The maximum number of results to include in the response. If more results exist than the specified MaxResults value, a token is included in the response so that the remaining paginated results can be retrieved.
     */
    MaxResults?: MaxResults;
    /**
     * An optional token returned from a prior request. Use this token for pagination of results from this action. If this parameter is specified, the response includes only results beyond the token, up to the value specified by MaxResults.
     */
    NextToken?: NextToken;
  }
  export interface ListPolicyStoresOutput {
    /**
     * Provides an identifier to allow retrieval of paginated results.
     */
    NextToken?: NextToken;
    /**
     * The PolicyStores requested.
     */
    PolicyStores: PolicyStoreList;
  }
  export type LongAttribute = number;
  export type MaxResults = number;
  export type NextToken = string;
  export type ParentList = EntityIdentifier[];
  export type PolicyBody = string;
  export interface PolicyDefinition {
    /**
     * The inline policy.
     */
    InlinePolicy?: InlinePolicy;
  }
  export interface PolicyDefinitionDetail {
    /**
     * The inline policy.
     */
    InlinePolicy?: InlinePolicyDetail;
  }
  export interface PolicyDefinitionItem {
    /**
     * The object that represents an InlinePolicy in the ListPolicies operation output. 
     */
    InlinePolicy?: InlinePolicyItem;
  }
  export interface PolicyFilter {
    /**
     * A filter to list policies for a principal.
     */
    Principal?: EntityReference;
    /**
     * A filter to list policies for a resource.
     */
    Resource?: EntityReference;
  }
  export type PolicyId = string;
  export interface PolicyItem {
    /**
     * The Amazon Resource Name (ARN) of the policy.
     */
    Arn: ResourceArn;
    /**
     * The date and time the policy was created.
     */
    CreatedDate: TimestampFormat;
    /**
     * The date and time the policy was last updated.
     */
    LastUpdatedDate: TimestampFormat;
    /**
     * The policy definition of an item in the list of policies returned.
     */
    PolicyDefinition: PolicyDefinitionItem;
    /**
     * The identifier of the policy you want information about.
     */
    PolicyId: PolicyId;
    /**
     * The identifier of the PolicyStore where the policy you want information about is stored.
     */
    PolicyStoreId: PolicyStoreId;
    /**
     * The type of the policy, such as Inline.
     */
    PolicyType: PolicyType;
    /**
     * The prinicpal associated with the policy.
     */
    Principal?: EntityIdentifier;
    /**
     * The resource associated with the policy.
     */
    Resource?: EntityIdentifier;
  }
  export type PolicyList = PolicyItem[];
  export type PolicyStoreId = string;
  export interface PolicyStoreItem {
    /**
     * The Amazon Resource Name (ARN) of the policy store.
     */
    Arn: ResourceArn;
    /**
     * The date and time the policy was created.
     */
    CreatedDate: TimestampFormat;
    /**
     * The identifier of the PolicyStore where the policy you want information about is stored.
     */
    PolicyStoreId: PolicyStoreId;
  }
  export type PolicyStoreList = PolicyStoreItem[];
  export type PolicyType = "Inline"|string;
  export type RecordAttribute = {[key: string]: AttributeValue};
  export type ResourceArn = string;
  export type SetAttribute = AttributeValue[];
  export interface SliceComplement {
    /**
     * Entity data that is used to make the authorization decision. For example, groups to which the principal belongs.
     */
    Entities?: EntitiesList;
  }
  export type String = string;
  export type StringAttribute = string;
  export type TimestampFormat = Date;
  /**
   * A string in YYYY-MM-DD format that represents the latest possible API version that can be used in this service. Specify 'latest' to use the latest possible version.
   */
  export type apiVersion = "2021-12-01"|"latest"|string;
  export interface ClientApiVersions {
    /**
     * A string in YYYY-MM-DD format that represents the latest possible API version that can be used in this service. Specify 'latest' to use the latest possible version.
     */
    apiVersion?: apiVersion;
  }
  export type ClientConfiguration = ServiceConfigurationOptions & ClientApiVersions;
  /**
   * Contains interfaces for use with the VerifiedPermissions client.
   */
  export import Types = VerifiedPermissions;
}
export = VerifiedPermissions;
