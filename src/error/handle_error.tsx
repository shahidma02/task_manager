function handleError(error: any, customMessage: string): never {
  console.error(customMessage, error);
  throw new Error(customMessage);
}
