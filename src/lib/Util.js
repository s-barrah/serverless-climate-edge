
export const removeDuplicates = (data) => {
  return data.filter((v,i,a) => a.findIndex(t => (JSON.stringify(t) === JSON.stringify(v))) === i);
};

export const removeDuplicateByProp = (data, prop) => {
  const uniq = {};
  return data.filter(obj => !uniq[obj[prop]] && (uniq[obj[prop]] = true));
};

export const getCount = (results) => {

  return results.length > 1 ? `${results.length} records` : `${results.length} record`;
}
