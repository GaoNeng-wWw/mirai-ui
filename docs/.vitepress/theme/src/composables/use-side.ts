import { DefaultTheme, useData } from 'vitepress';
export const useSideBar = () => {
  const data = useData();
  const sidebar = data.theme.value.sidebar as DefaultTheme.SidebarItem[];
  return { sidebar };
};
