export const joinUsernames = (usernames: string[]) => {
  const sortedArray: string[] = usernames.sort((n1, n2) => {
    if (n1 > n2) {
      return 1;
    } else if (n1 < n2) {
      return -1;
    }
    return 0;
  });
  return sortedArray.join("_");
}
