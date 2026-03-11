// MIS Permissions
export const permissions = [
  // Core MIS Permissions
  { name: "dashboard", value: "Dashboard" },
  { name: "students", value: "Students" },
  { name: "teachers", value: "Teachers" },
  { name: "classes", value: "Classes" },
  { name: "attendance", value: "Attendance" },
  { name: "grades", value: "Grades" },
  { name: "fees", value: "Fees" },
  { name: "library", value: "Library" },
  { name: "reports", value: "Reports" },
  { name: "settings", value: "Settings" },
  { name: "users", value: "Users" },
  { name: "parents", value: "Parents" },
  { name: "academic_year", value: "Academic Year" },
] as const;

export type Permission = (typeof permissions)[number]["name"];

export const routePermissions: Record<string, Permission | Permission[]> = {
  "/mis": "dashboard",
  "/mis/students": "students",
  "/mis/students/new": "students",
  "/mis/students/:id": "students",
  "/mis/students/:id/edit": "students",
  "/mis/teachers": "teachers",
  "/mis/teachers/new": "teachers",
  "/mis/teachers/:id": "teachers",
  "/mis/teachers/:id/edit": "teachers",
  "/mis/classes": "classes",
  "/mis/classes/new": "classes",
  "/mis/classes/:id": "classes",
  "/mis/attendance": "attendance",
  "/mis/attendance/mark": "attendance",
  "/mis/attendance/report": "attendance",
  "/mis/grades": "grades",
  "/mis/grades/entry": "grades",
  "/mis/grades/exams": "grades",
  "/mis/grades/report-cards": "grades",
  "/mis/fees": "fees",
  "/mis/fees/structure": "fees",
  "/mis/fees/collection": "fees",
  "/mis/fees/reports": "fees",
  "/mis/library": "library",
  "/mis/library/catalog": "library",
  "/mis/library/issue": "library",
  "/mis/library/return": "library",
  "/mis/reports": "reports",
  "/mis/parents": "parents",
  "/mis/parents/:id": "parents",
  "/mis/settings": "settings",
  "/mis/settings/general": "settings",
  "/mis/settings/users": "users",
  "/mis/settings/academic-year": "academic_year",
};

export const hasRoutePermission = (
  route: string,
  userPermissions: Permission[]
) => {
  const rp = routePermissions[route];
  if (rp === undefined) return true;
  const perm = Array.isArray(rp) ? rp : [rp];
  return perm.some((p) => userPermissions.includes(p));
};
