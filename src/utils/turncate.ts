const truncate = (input: string): string => {
  let text = input.length > 400 ? `${input.substring(0, 400)}...` : input;

  return text;
};

export default truncate;
