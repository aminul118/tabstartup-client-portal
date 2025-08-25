import Layout from '@/components/layouts/Layout';
import ShowCompanyProfile from '@/components/modules/companyProfile/ShowCompanyProfile';
import Login from '@/pages/auth/Login';
import Profile from '@/pages/auth/Profile';
import Register from '@/pages/auth/Register';
import Unauthorized from '@/pages/auth/Unauthorized';
import Verify from '@/pages/auth/Verify';
import CompanyProfile from '@/pages/CompanyProfile';
import Home from '@/pages/Home';
import MyInvestment from '@/pages/MyInvestment';
import Projects from '@/pages/Projects';
import Setting from '@/pages/Setting';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '',
    // Component: withAuth(Layout, (role.investor as TRole) || (role.entrepreneur as TRole)),
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'projects',
        Component: Projects,
      },
      {
        path: 'my-investment',
        Component: MyInvestment,
      },
      {
        path: 'setting',
        Component: Setting,
      },
      {
        path: 'profile',
        Component: Profile,
      },
      {
        path: 'my-company-profile',
        Component: ShowCompanyProfile,
      },
    ],
  },
  {
    path: 'login',
    Component: Login,
  },
  {
    path: 'register',
    Component: Register,
  },
  {
    path: 'verify',
    Component: Verify,
  },
  {
    path: 'unauthorized',
    Component: Unauthorized,
  },
  {
    path: 'company-profile',
    Component: CompanyProfile,
  },
]);

export default router;
