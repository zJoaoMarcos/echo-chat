export const getNameInitials = (completeName: string) => { 
  const completeNameSplitted: string[] = completeName.split(" ");
  let initials: string = "";

  for (let i = 0; i < 2 && i < completeNameSplitted.length; i++) {
    initials += completeNameSplitted[i][0].toUpperCase();
  }

  return initials;
}