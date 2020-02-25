const validator = (schema: any) =>
  (payload: any) => {
    const {error} = schema.validate(payload);
    if (error) {
      const message = error.details.map(
          (el: { message: any; }) => el.message).join('\n');
      return message;
    }
    return false;
  };

export default validator;
