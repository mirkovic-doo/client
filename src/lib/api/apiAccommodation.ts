/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Assembly {
  definedTypes?: TypeInfo[] | null;
  exportedTypes?: Type[] | null;
  /** @deprecated */
  codeBase?: string | null;
  entryPoint?: MethodInfo;
  fullName?: string | null;
  imageRuntimeVersion?: string | null;
  isDynamic?: boolean;
  location?: string | null;
  reflectionOnly?: boolean;
  isCollectible?: boolean;
  isFullyTrusted?: boolean;
  customAttributes?: CustomAttributeData[] | null;
  /** @deprecated */
  escapedCodeBase?: string | null;
  manifestModule?: Module;
  modules?: Module[] | null;
  /** @deprecated */
  globalAssemblyCache?: boolean;
  /** @format int64 */
  hostContext?: number;
  securityRuleSet?: SecurityRuleSet;
}

export interface AvailabilityPeriodRequest {
  /** @format uuid */
  id?: string | null;
  /** @format date */
  startDate: string;
  /** @format date */
  endDate: string;
  /** @format double */
  pricePerDay: number;
  /** @format uuid */
  propertyId: string;
}

export interface AvailabilityPeriodResponse {
  /** @format uuid */
  id?: string;
  /** @format date */
  startDate?: string;
  /** @format date */
  endDate?: string;
  /** @format double */
  pricePerDay?: number;
  /** @format uuid */
  propertyId?: string;
}

export enum CallingConventions {
  Standard = 'Standard',
  VarArgs = 'VarArgs',
  Any = 'Any',
  HasThis = 'HasThis',
  ExplicitThis = 'ExplicitThis',
}

export interface ConstructorInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  memberType?: MemberTypes;
}

export interface CustomAttributeData {
  attributeType?: Type;
  constructor?: ConstructorInfo;
  constructorArguments?: CustomAttributeTypedArgument[] | null;
  namedArguments?: CustomAttributeNamedArgument[] | null;
}

export interface CustomAttributeNamedArgument {
  memberInfo?: MemberInfo;
  typedValue?: CustomAttributeTypedArgument;
  memberName?: string | null;
  isField?: boolean;
}

export interface CustomAttributeTypedArgument {
  argumentType?: Type;
  value?: any;
}

export enum EventAttributes {
  None = 'None',
  SpecialName = 'SpecialName',
  RTSpecialName = 'RTSpecialName',
}

export interface EventInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  attributes?: EventAttributes;
  isSpecialName?: boolean;
  addMethod?: MethodInfo;
  removeMethod?: MethodInfo;
  raiseMethod?: MethodInfo;
  isMulticast?: boolean;
  eventHandlerType?: Type;
}

export enum FieldAttributes {
  PrivateScope = 'PrivateScope',
  Private = 'Private',
  FamANDAssem = 'FamANDAssem',
  Assembly = 'Assembly',
  Family = 'Family',
  FamORAssem = 'FamORAssem',
  Public = 'Public',
  FieldAccessMask = 'FieldAccessMask',
  Static = 'Static',
  InitOnly = 'InitOnly',
  Literal = 'Literal',
  NotSerialized = 'NotSerialized',
  HasFieldRVA = 'HasFieldRVA',
  SpecialName = 'SpecialName',
  RTSpecialName = 'RTSpecialName',
  HasFieldMarshal = 'HasFieldMarshal',
  PinvokeImpl = 'PinvokeImpl',
  HasDefault = 'HasDefault',
  ReservedMask = 'ReservedMask',
}

export interface FieldInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  attributes?: FieldAttributes;
  fieldType?: Type;
  isInitOnly?: boolean;
  isLiteral?: boolean;
  /** @deprecated */
  isNotSerialized?: boolean;
  isPinvokeImpl?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  fieldHandle?: RuntimeFieldHandle;
}

export enum GenericParameterAttributes {
  None = 'None',
  Covariant = 'Covariant',
  Contravariant = 'Contravariant',
  VarianceMask = 'VarianceMask',
  ReferenceTypeConstraint = 'ReferenceTypeConstraint',
  NotNullableValueTypeConstraint = 'NotNullableValueTypeConstraint',
  DefaultConstructorConstraint = 'DefaultConstructorConstraint',
  SpecialConstraintMask = 'SpecialConstraintMask',
}

export type ICustomAttributeProvider = object;

export type IOutputFormatter = object;

export type IntPtr = object;

export enum LayoutKind {
  Sequential = 'Sequential',
  Explicit = 'Explicit',
  Auto = 'Auto',
}

export interface MemberInfo {
  memberType?: MemberTypes;
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
}

export enum MemberTypes {
  Constructor = 'Constructor',
  Event = 'Event',
  Field = 'Field',
  Method = 'Method',
  Property = 'Property',
  TypeInfo = 'TypeInfo',
  Custom = 'Custom',
  NestedType = 'NestedType',
  All = 'All',
}

export enum MethodAttributes {
  PrivateScope = 'PrivateScope',
  Private = 'Private',
  FamANDAssem = 'FamANDAssem',
  Assembly = 'Assembly',
  Family = 'Family',
  FamORAssem = 'FamORAssem',
  Public = 'Public',
  MemberAccessMask = 'MemberAccessMask',
  UnmanagedExport = 'UnmanagedExport',
  Static = 'Static',
  Final = 'Final',
  Virtual = 'Virtual',
  HideBySig = 'HideBySig',
  NewSlot = 'NewSlot',
  CheckAccessOnOverride = 'CheckAccessOnOverride',
  Abstract = 'Abstract',
  SpecialName = 'SpecialName',
  RTSpecialName = 'RTSpecialName',
  PinvokeImpl = 'PinvokeImpl',
  HasSecurity = 'HasSecurity',
  RequireSecObject = 'RequireSecObject',
  ReservedMask = 'ReservedMask',
}

export interface MethodBase {
  memberType?: MemberTypes;
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
}

export enum MethodImplAttributes {
  IL = 'IL',
  Native = 'Native',
  OPTIL = 'OPTIL',
  CodeTypeMask = 'CodeTypeMask',
  ManagedMask = 'ManagedMask',
  NoInlining = 'NoInlining',
  ForwardRef = 'ForwardRef',
  Synchronized = 'Synchronized',
  NoOptimization = 'NoOptimization',
  PreserveSig = 'PreserveSig',
  AggressiveInlining = 'AggressiveInlining',
  AggressiveOptimization = 'AggressiveOptimization',
  InternalCall = 'InternalCall',
  MaxMethodImplVal = 'MaxMethodImplVal',
}

export interface MethodInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  attributes?: MethodAttributes;
  methodImplementationFlags?: MethodImplAttributes;
  callingConvention?: CallingConventions;
  isAbstract?: boolean;
  isConstructor?: boolean;
  isFinal?: boolean;
  isHideBySig?: boolean;
  isSpecialName?: boolean;
  isStatic?: boolean;
  isVirtual?: boolean;
  isAssembly?: boolean;
  isFamily?: boolean;
  isFamilyAndAssembly?: boolean;
  isFamilyOrAssembly?: boolean;
  isPrivate?: boolean;
  isPublic?: boolean;
  isConstructedGenericMethod?: boolean;
  isGenericMethod?: boolean;
  isGenericMethodDefinition?: boolean;
  containsGenericParameters?: boolean;
  methodHandle?: RuntimeMethodHandle;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  memberType?: MemberTypes;
  returnParameter?: ParameterInfo;
  returnType?: Type;
  returnTypeCustomAttributes?: ICustomAttributeProvider;
}

export interface Module {
  assembly?: Assembly;
  fullyQualifiedName?: string | null;
  name?: string | null;
  /** @format int32 */
  mdStreamVersion?: number;
  /** @format uuid */
  moduleVersionId?: string;
  scopeName?: string | null;
  moduleHandle?: ModuleHandle;
  customAttributes?: CustomAttributeData[] | null;
  /** @format int32 */
  metadataToken?: number;
}

export interface ModuleHandle {
  /** @format int32 */
  mdStreamVersion?: number;
}

export interface OkObjectResult {
  [x: string]: any;
  value?: any;
  formatters?: IOutputFormatter[] | null;
  contentTypes?: string[] | null;
  declaredType?: Type;
  /** @format int32 */
  statusCode?: number | null;
}

export enum ParameterAttributes {
  None = 'None',
  In = 'In',
  Out = 'Out',
  Lcid = 'Lcid',
  Retval = 'Retval',
  Optional = 'Optional',
  HasDefault = 'HasDefault',
  HasFieldMarshal = 'HasFieldMarshal',
  Reserved3 = 'Reserved3',
  Reserved4 = 'Reserved4',
  ReservedMask = 'ReservedMask',
}

export interface ParameterInfo {
  attributes?: ParameterAttributes;
  member?: MemberInfo;
  name?: string | null;
  parameterType?: Type;
  /** @format int32 */
  position?: number;
  isIn?: boolean;
  isLcid?: boolean;
  isOptional?: boolean;
  isOut?: boolean;
  isRetval?: boolean;
  defaultValue?: any;
  rawDefaultValue?: any;
  hasDefaultValue?: boolean;
  customAttributes?: CustomAttributeData[] | null;
  /** @format int32 */
  metadataToken?: number;
}

export enum PricingOption {
  PerGuest = 'PerGuest',
  PerUnit = 'PerUnit',
}

export enum PropertyAttributes {
  None = 'None',
  SpecialName = 'SpecialName',
  RTSpecialName = 'RTSpecialName',
  HasDefault = 'HasDefault',
  Reserved2 = 'Reserved2',
  Reserved3 = 'Reserved3',
  Reserved4 = 'Reserved4',
  ReservedMask = 'ReservedMask',
}

export interface PropertyInfo {
  name?: string | null;
  declaringType?: Type;
  reflectedType?: Type;
  module?: Module;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  memberType?: MemberTypes;
  propertyType?: Type;
  attributes?: PropertyAttributes;
  isSpecialName?: boolean;
  canRead?: boolean;
  canWrite?: boolean;
  getMethod?: MethodInfo;
  setMethod?: MethodInfo;
}

export interface PropertyRequest {
  /** @format uuid */
  id?: string | null;
  name: string | null;
  location: string | null;
  amenities: string[] | null;
  photos: string[] | null;
  /** @format int32 */
  minGuests: number;
  /** @format int32 */
  maxGuests: number;
  pricingOption: PricingOption;
  autoConfirmReservation: boolean;
}

export interface PropertyResponse {
  /** @format uuid */
  id?: string;
  name?: string | null;
  location?: string | null;
  amenities?: string[] | null;
  photos?: string[] | null;
  /** @format int32 */
  minGuests?: number;
  /** @format int32 */
  maxGuests?: number;
  pricingOption?: PricingOption;
  autoConfirmReservation?: boolean;
  /** @format uuid */
  createdById?: string;
  /** @format uuid */
  updatedById?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface ReservationRequest {
  /** @format date */
  startDate: string;
  /** @format date */
  endDate: string;
  /** @format int32 */
  guests: number;
  /** @format uuid */
  propertyId: string;
}

export interface ReservationResponse {
  /** @format uuid */
  id?: string;
  /** @format date */
  startDate?: string;
  /** @format date */
  endDate?: string;
  /** @format int32 */
  guests?: number;
  status?: ReservationStatus;
  /** @format double */
  price?: number;
  /** @format uuid */
  propertyId?: string;
  propertyName?: string | null;
  /** @format uuid */
  createdById?: string;
  /** @format uuid */
  updatedById?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
}

export enum ReservationStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  GuestCancelled = 'GuestCancelled',
  HostCancelled = 'HostCancelled',
}

export interface RuntimeFieldHandle {
  value?: IntPtr;
}

export interface RuntimeMethodHandle {
  value?: IntPtr;
}

export interface RuntimeTypeHandle {
  value?: IntPtr;
}

export interface SearchPropertyResponse {
  /** @format uuid */
  id?: string;
  name?: string | null;
  location?: string | null;
  amenities?: string[] | null;
  photos?: string[] | null;
  /** @format int32 */
  minGuests?: number;
  /** @format int32 */
  maxGuests?: number;
  pricingOption?: PricingOption;
  autoConfirmReservation?: boolean;
  /** @format uuid */
  createdById?: string;
  /** @format uuid */
  updatedById?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  updatedAt?: string;
  /** @format double */
  totalPrice?: number;
  /** @format double */
  unitPrice?: number;
}

export enum SecurityRuleSet {
  None = 'None',
  Level1 = 'Level1',
  Level2 = 'Level2',
}

export interface StructLayoutAttribute {
  typeId?: any;
  value?: LayoutKind;
}

export interface Type {
  name?: string | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  isInterface?: boolean;
  memberType?: MemberTypes;
  namespace?: string | null;
  assemblyQualifiedName?: string | null;
  fullName?: string | null;
  assembly?: Assembly;
  module?: Module;
  isNested?: boolean;
  declaringType?: Type;
  declaringMethod?: MethodBase;
  reflectedType?: Type;
  underlyingSystemType?: Type;
  isTypeDefinition?: boolean;
  isArray?: boolean;
  isByRef?: boolean;
  isPointer?: boolean;
  isConstructedGenericType?: boolean;
  isGenericParameter?: boolean;
  isGenericTypeParameter?: boolean;
  isGenericMethodParameter?: boolean;
  isGenericType?: boolean;
  isGenericTypeDefinition?: boolean;
  isSZArray?: boolean;
  isVariableBoundArray?: boolean;
  isByRefLike?: boolean;
  isFunctionPointer?: boolean;
  isUnmanagedFunctionPointer?: boolean;
  hasElementType?: boolean;
  genericTypeArguments?: Type[] | null;
  /** @format int32 */
  genericParameterPosition?: number;
  genericParameterAttributes?: GenericParameterAttributes;
  attributes?: TypeAttributes;
  isAbstract?: boolean;
  isImport?: boolean;
  isSealed?: boolean;
  isSpecialName?: boolean;
  isClass?: boolean;
  isNestedAssembly?: boolean;
  isNestedFamANDAssem?: boolean;
  isNestedFamily?: boolean;
  isNestedFamORAssem?: boolean;
  isNestedPrivate?: boolean;
  isNestedPublic?: boolean;
  isNotPublic?: boolean;
  isPublic?: boolean;
  isAutoLayout?: boolean;
  isExplicitLayout?: boolean;
  isLayoutSequential?: boolean;
  isAnsiClass?: boolean;
  isAutoClass?: boolean;
  isUnicodeClass?: boolean;
  isCOMObject?: boolean;
  isContextful?: boolean;
  isEnum?: boolean;
  isMarshalByRef?: boolean;
  isPrimitive?: boolean;
  isValueType?: boolean;
  isSignatureType?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  structLayoutAttribute?: StructLayoutAttribute;
  typeInitializer?: ConstructorInfo;
  typeHandle?: RuntimeTypeHandle;
  /** @format uuid */
  guid?: string;
  baseType?: Type;
  /** @deprecated */
  isSerializable?: boolean;
  containsGenericParameters?: boolean;
  isVisible?: boolean;
}

export enum TypeAttributes {
  NotPublic = 'NotPublic',
  Public = 'Public',
  NestedPublic = 'NestedPublic',
  NestedPrivate = 'NestedPrivate',
  NestedFamily = 'NestedFamily',
  NestedAssembly = 'NestedAssembly',
  NestedFamANDAssem = 'NestedFamANDAssem',
  VisibilityMask = 'VisibilityMask',
  SequentialLayout = 'SequentialLayout',
  ExplicitLayout = 'ExplicitLayout',
  LayoutMask = 'LayoutMask',
  Interface = 'Interface',
  Abstract = 'Abstract',
  Sealed = 'Sealed',
  SpecialName = 'SpecialName',
  RTSpecialName = 'RTSpecialName',
  Import = 'Import',
  Serializable = 'Serializable',
  WindowsRuntime = 'WindowsRuntime',
  UnicodeClass = 'UnicodeClass',
  AutoClass = 'AutoClass',
  StringFormatMask = 'StringFormatMask',
  HasSecurity = 'HasSecurity',
  ReservedMask = 'ReservedMask',
  BeforeFieldInit = 'BeforeFieldInit',
  CustomFormatMask = 'CustomFormatMask',
}

export interface TypeInfo {
  name?: string | null;
  customAttributes?: CustomAttributeData[] | null;
  isCollectible?: boolean;
  /** @format int32 */
  metadataToken?: number;
  isInterface?: boolean;
  memberType?: MemberTypes;
  namespace?: string | null;
  assemblyQualifiedName?: string | null;
  fullName?: string | null;
  assembly?: Assembly;
  module?: Module;
  isNested?: boolean;
  declaringType?: Type;
  declaringMethod?: MethodBase;
  reflectedType?: Type;
  underlyingSystemType?: Type;
  isTypeDefinition?: boolean;
  isArray?: boolean;
  isByRef?: boolean;
  isPointer?: boolean;
  isConstructedGenericType?: boolean;
  isGenericParameter?: boolean;
  isGenericTypeParameter?: boolean;
  isGenericMethodParameter?: boolean;
  isGenericType?: boolean;
  isGenericTypeDefinition?: boolean;
  isSZArray?: boolean;
  isVariableBoundArray?: boolean;
  isByRefLike?: boolean;
  isFunctionPointer?: boolean;
  isUnmanagedFunctionPointer?: boolean;
  hasElementType?: boolean;
  genericTypeArguments?: Type[] | null;
  /** @format int32 */
  genericParameterPosition?: number;
  genericParameterAttributes?: GenericParameterAttributes;
  attributes?: TypeAttributes;
  isAbstract?: boolean;
  isImport?: boolean;
  isSealed?: boolean;
  isSpecialName?: boolean;
  isClass?: boolean;
  isNestedAssembly?: boolean;
  isNestedFamANDAssem?: boolean;
  isNestedFamily?: boolean;
  isNestedFamORAssem?: boolean;
  isNestedPrivate?: boolean;
  isNestedPublic?: boolean;
  isNotPublic?: boolean;
  isPublic?: boolean;
  isAutoLayout?: boolean;
  isExplicitLayout?: boolean;
  isLayoutSequential?: boolean;
  isAnsiClass?: boolean;
  isAutoClass?: boolean;
  isUnicodeClass?: boolean;
  isCOMObject?: boolean;
  isContextful?: boolean;
  isEnum?: boolean;
  isMarshalByRef?: boolean;
  isPrimitive?: boolean;
  isValueType?: boolean;
  isSignatureType?: boolean;
  isSecurityCritical?: boolean;
  isSecuritySafeCritical?: boolean;
  isSecurityTransparent?: boolean;
  structLayoutAttribute?: StructLayoutAttribute;
  typeInitializer?: ConstructorInfo;
  typeHandle?: RuntimeTypeHandle;
  /** @format uuid */
  guid?: string;
  baseType?: Type;
  /** @deprecated */
  isSerializable?: boolean;
  containsGenericParameters?: boolean;
  isVisible?: boolean;
  genericTypeParameters?: Type[] | null;
  declaredConstructors?: ConstructorInfo[] | null;
  declaredEvents?: EventInfo[] | null;
  declaredFields?: FieldInfo[] | null;
  declaredMembers?: MemberInfo[] | null;
  declaredMethods?: MethodInfo[] | null;
  declaredNestedTypes?: TypeInfo[] | null;
  declaredProperties?: PropertyInfo[] | null;
  implementedInterfaces?: Type[] | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title AccommodationService
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  availabilityperiod = {
    /**
     * No description
     *
     * @tags AvailabilityPeriod
     * @name GetAvailabilityPeriod
     * @request GET:/api/availabilityperiod/{id}
     */
    getAvailabilityPeriod: (id: string, params: RequestParams = {}) =>
      this.request<AvailabilityPeriodResponse, string>({
        path: `/api/availabilityperiod/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AvailabilityPeriod
     * @name DeleteAvailabilityPeriod
     * @request DELETE:/api/availabilityperiod/{id}
     */
    deleteAvailabilityPeriod: (id: string, params: RequestParams = {}) =>
      this.request<OkObjectResult, string>({
        path: `/api/availabilityperiod/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AvailabilityPeriod
     * @name CreateAvailabilityPeriod
     * @request POST:/api/availabilityperiod
     */
    createAvailabilityPeriod: (data: AvailabilityPeriodRequest, params: RequestParams = {}) =>
      this.request<AvailabilityPeriodResponse, string>({
        path: `/api/availabilityperiod`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags AvailabilityPeriod
     * @name UpdateAvailabilityPeriod
     * @request PUT:/api/availabilityperiod
     */
    updateAvailabilityPeriod: (data: AvailabilityPeriodRequest, params: RequestParams = {}) =>
      this.request<AvailabilityPeriodResponse, string>({
        path: `/api/availabilityperiod`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  property = {
    /**
     * No description
     *
     * @tags Property
     * @name GetProperty
     * @request GET:/api/property/{id}
     */
    getProperty: (id: string, params: RequestParams = {}) =>
      this.request<PropertyResponse, string>({
        path: `/api/property/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name DeleteProperty
     * @request DELETE:/api/property/{id}
     */
    deleteProperty: (id: string, params: RequestParams = {}) =>
      this.request<OkObjectResult, string>({
        path: `/api/property/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name CreateProperty
     * @request POST:/api/property
     */
    createProperty: (data: PropertyRequest, params: RequestParams = {}) =>
      this.request<PropertyResponse, string>({
        path: `/api/property`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name UpdateProperty
     * @request PUT:/api/property
     */
    updateProperty: (data: PropertyRequest, params: RequestParams = {}) =>
      this.request<PropertyResponse, string>({
        path: `/api/property`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name GetMyProperties
     * @request GET:/api/property/my
     */
    getMyProperties: (params: RequestParams = {}) =>
      this.request<PropertyResponse[], string>({
        path: `/api/property/my`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name DeleteHostProperties
     * @request DELETE:/api/property/host/delete/action
     */
    deleteHostProperties: (params: RequestParams = {}) =>
      this.request<void, string>({
        path: `/api/property/host/delete/action`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name SearchProperties
     * @request GET:/api/property/search
     */
    searchProperties: (
      query?: {
        location?: string;
        /** @format int32 */
        guests?: number;
        /** @format date */
        startDate?: string;
        /** @format date */
        endDate?: string;
      },
      params: RequestParams = {}
    ) =>
      this.request<SearchPropertyResponse[], string>({
        path: `/api/property/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name GetAvailabilityPeriodsByPropertyId
     * @request GET:/api/property/{id}/availabilityperiod
     */
    getAvailabilityPeriodsByPropertyId: (id: string, params: RequestParams = {}) =>
      this.request<AvailabilityPeriodResponse[], string>({
        path: `/api/property/${id}/availabilityperiod`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name GetReservationsByPropertyId
     * @request GET:/api/property/{id}/reservation
     */
    getReservationsByPropertyId: (id: string, params: RequestParams = {}) =>
      this.request<ReservationResponse[], string>({
        path: `/api/property/${id}/reservation`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
  reservation = {
    /**
     * No description
     *
     * @tags Reservation
     * @name GetReservation
     * @request GET:/api/reservation/{id}
     */
    getReservation: (id: string, params: RequestParams = {}) =>
      this.request<ReservationResponse, string>({
        path: `/api/reservation/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name DeleteReservation
     * @request DELETE:/api/reservation/{id}
     */
    deleteReservation: (id: string, params: RequestParams = {}) =>
      this.request<OkObjectResult, string>({
        path: `/api/reservation/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name CreateReservation
     * @request POST:/api/reservation
     */
    createReservation: (data: ReservationRequest, params: RequestParams = {}) =>
      this.request<ReservationResponse, string>({
        path: `/api/reservation`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name ConfirmReservation
     * @request GET:/api/reservation/confirm/{id}
     */
    confirmReservation: (id: string, params: RequestParams = {}) =>
      this.request<OkObjectResult, string>({
        path: `/api/reservation/confirm/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name CancelReservationGuest
     * @request DELETE:/api/reservation/{id}/cancel/guest
     */
    cancelReservationGuest: (id: string, params: RequestParams = {}) =>
      this.request<OkObjectResult, string>({
        path: `/api/reservation/${id}/cancel/guest`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name CancelReservationHost
     * @request DELETE:/api/reservation/{id}/cancel/host
     */
    cancelReservationHost: (id: string, params: RequestParams = {}) =>
      this.request<OkObjectResult, string>({
        path: `/api/reservation/${id}/cancel/host`,
        method: 'DELETE',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name GetNumberOfCancelledReservations
     * @request GET:/api/reservation/cancellednum/guest/{userId}
     */
    getNumberOfCancelledReservations: (userId: string, params: RequestParams = {}) =>
      this.request<OkObjectResult, string>({
        path: `/api/reservation/cancellednum/guest/${userId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name GetGuestReservations
     * @request GET:/api/reservation/guest/{userId}
     */
    getGuestReservations: (userId: string, params: RequestParams = {}) =>
      this.request<ReservationResponse[], string>({
        path: `/api/reservation/guest/${userId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name DeleteGuestReservations
     * @request DELETE:/api/reservation/guest/delete/action/{userId}
     */
    deleteGuestReservations: (userId: string, params: RequestParams = {}) =>
      this.request<void, string>({
        path: `/api/reservation/guest/delete/action/${userId}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Reservation
     * @name GetHostReservations
     * @request GET:/api/reservation/host/{userId}
     */
    getHostReservations: (userId: string, params: RequestParams = {}) =>
      this.request<ReservationResponse[], string>({
        path: `/api/reservation/host/${userId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
