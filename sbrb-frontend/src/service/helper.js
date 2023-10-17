export const getRoleSkillMatch = (userSkills, roleSkills) => {
  const matchingItems = userSkills.filter((skill) =>
    roleSkills.includes(skill)
  );
  const matchingPercentage = (matchingItems.length / roleSkills.length) * 100;
  return matchingPercentage;
};

export const getMatchedSkills = (userSkills, roleSkills) => {
  const matchingItems = userSkills.filter((skill) =>
    roleSkills.includes(skill)
  );
  return matchingItems;
};
