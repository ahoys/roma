/**
 * Get the roadmap id from the pathname.
 * @param pathname Url to investigate.
 * @returns Roadmap id or undefined.
 */
export const getRoadmapId = (pathname: string): number | undefined => {
  let roadmap = undefined;
  const split = pathname.split('/');
  const rIndex = split.indexOf('r');
  if (rIndex !== -1 && typeof split[rIndex + 1] === 'string') {
    roadmap = Number(split[rIndex + 1]);
  }
  return roadmap;
};
