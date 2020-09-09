type NoParamReturnNulFunction = () => void;
type OneParamReturnNulFunction = (any: any) => void;
type GenericObjectType = { [key: string]: any };
type APIReturnFunction = (result: GenericObjectType, err: string) => void;
