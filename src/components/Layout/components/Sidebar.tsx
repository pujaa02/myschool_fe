import Image from 'components/Image';
import { FeaturesEnum, PermissionEnum } from 'constants/common.constant';
import { PRIVATE_NAVIGATION } from 'constants/navigation.constant';
import { ROLES } from 'constants/roleAndPermission.constant';
import { useRolePermission } from 'hooks/useRolePermission';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'redux-toolkit/slices/authSlice';
import { getRoles } from 'redux-toolkit/slices/rolePermissionSlice';
import {
  ActiveSelector,
  SidebarSelector,
  activeSidebar,
} from 'redux-toolkit/slices/sidebarSlice';
import { convertRoleToUrl, customRandomNumberGenerator } from 'utils';
import { NavigationItemType } from '../constants';
import SideBarMenu from './SideBarMenu';
import './style/sidebarMain.css';

const Sidebar = () => {
  const activeData = useSelector(ActiveSelector);
  const User = useSelector(getCurrentUser);
  const location = useLocation().pathname;
  const roles = useSelector(getRoles);

  const { TrainingSpecialist, Trainer, SalesRep, Accounting } = ROLES;

  const rolesToDisplay: string[] = [
    TrainingSpecialist,
    Trainer,
    SalesRep,
    Accounting,
  ];

  const allRoles = roles.filter((role) =>
    rolesToDisplay.find((displayRole) => displayRole === role.name)
  );

  const dispatch = useDispatch();
  const openSidebar = useSelector(SidebarSelector);
  const { t } = useTranslation('translation');
  const userRoleSubmenu = allRoles.map((data) => {
    const labelId = `roles.${data.name}`;
    return {
      id: data.id,
      uniqueId: labelId,
      label: t(labelId as never),
      path: `${
        PRIVATE_NAVIGATION.usersManagement.view.roleView.path
      }${convertRoleToUrl(data.name)}`,
    };
  });

  const clientSubMenu = [
    {
      id: 1,
      uniqueId: 'SideNavigation.client.companyTitle',
      label: t('SideNavigation.client.companyTitle'),
      path: PRIVATE_NAVIGATION.clientsManagement.company.list.path,
    },
    {
      id: 2,
      uniqueId: 'SideNavigation.client.managerTitle',
      label: t('SideNavigation.client.managerTitle'),
      path: PRIVATE_NAVIGATION.clientsManagement.managers.list.path,
    },
    {
      id: 3,
      uniqueId: 'SideNavigation.client.privateTitle',
      label: t('SideNavigation.client.privateTitle'),
      path: PRIVATE_NAVIGATION.clientsManagement.members.list.path,
    },
    {
      id: 4,
      uniqueId: 'SideNavigation.client.attendee',
      label: t('SideNavigation.client.attendee'),
      path: PRIVATE_NAVIGATION.clientsManagement.attendee.list.path,
    },
  ];

  const mailTemplateSubMenu = [
    {
      id: 1,
      uniqueId: 'SideNavigation.emailTemplate',
      label: t('SideNavigation.emailTemplate'),
      path: PRIVATE_NAVIGATION.emailTemplates.view.path,
    },
    {
      id: 2,
      uniqueId: 'SideNavigation.sendMail',
      label: t('SideNavigation.sendMail'),
      path: PRIVATE_NAVIGATION.sendMails.view.path,
    },
  ];
  const trainerCourseSubMenu = [
    {
      id: 1,
      uniqueId: 'SideNavigation.trainerCourses',
      label: t('SideNavigation.trainerCourse'),
      path: PRIVATE_NAVIGATION.trainerCourses.view.path,
    },
    {
      id: 2,
      uniqueId: 'SideNavigation.trainerCourseInvite',
      label: t('Dashboard.Trainer.CourseInvitation.invite'),
      path: PRIVATE_NAVIGATION.trainerCourses.courseInvite.path,
    },
  ];

  const coursesSubMenu = [
    {
      id: 1,
      uniqueId: 'SideNavigation.templateCourses',
      label: t('SideNavigation.templateCourses'),
      path: PRIVATE_NAVIGATION.coursesManagement.courseManagement.path,
    },
    {
      id: 2,
      uniqueId: 'SideNavigation.courseBundle',
      label: t('SideNavigation.courseBundle'),
      path: PRIVATE_NAVIGATION.coursesManagement.courseBundle.path,
    },
  ];

  const courseManagementSubMenu = [
    {
      id: 1,
      uniqueId: 'SideNavigation.coursesCategory',
      label: t('SideNavigation.coursesCategory'),
      path: PRIVATE_NAVIGATION.coursesManagement.view.path,
    },
    {
      id: 2,
      uniqueId: 'SideNavigation.courseRoom',
      label: t('SideNavigation.coursesRoom'),
      path: PRIVATE_NAVIGATION.coursesManagement.room.path,
    },
    {
      id: 3,
      uniqueId: 'SideNavigation.coursesResources',
      label: t('SideNavigation.coursesResources'),
      path: PRIVATE_NAVIGATION.coursesManagement.resources.path,
    },
  ];

  const templateManagement = [
    {
      id: 4,
      uniqueId: 'SideNavigation.coursesTemplates',
      label: t('SideNavigation.coursesTemplates'),
      path: PRIVATE_NAVIGATION.coursesManagement.courseTemplates.path,
    },

    {
      id: 5,
      uniqueId: 'SideNavigation.templateBundle',
      label: t('SideNavigation.templateBundle'),
      path: PRIVATE_NAVIGATION.coursesManagement.templateBundle.path,
    },
    {
      id: 8,
      uniqueId: 'SideNavigation.surveyTemplate',
      label: t('SideNavigation.surveyTemplate'),
      path: PRIVATE_NAVIGATION.coursesManagement.surveyTemplate.list.path,
    },
    {
      id: 9,
      uniqueId: 'SideNavigation.certificateTemplate',
      label: t('certificate.temp'),
      path: PRIVATE_NAVIGATION.coursesManagement.certificateTemplate.list.path,
    },
  ];

  const paymentSubMenu = [
    {
      id: 1,
      uniqueId: 'SideNavigation.paymentTerm',
      label: t('SideNavigation.paymentTerms'),
      path: PRIVATE_NAVIGATION.paymentTerms.view.path,
      hasAccess: useRolePermission(FeaturesEnum.PaymentTerms, PermissionEnum.View),
    },
    {
      id: 2,
      uniqueId: 'order',
      label: t('SideNavigation.order'),
      path: PRIVATE_NAVIGATION.order.list.path,
      hasAccess: useRolePermission(FeaturesEnum.Order, PermissionEnum.View),
    },
    {
      id: 3,
      uniqueId: 'Products',
      label: t('SideNavigation.products'),
      path: PRIVATE_NAVIGATION.quoteProducts.list.path,
      hasAccess: useRolePermission(FeaturesEnum.Order, PermissionEnum.View),
    },
    {
      id: 4,
      uniqueId: 'Invoice',
      label: t('SideNavigation.invoice'),
      path: PRIVATE_NAVIGATION.invoice.view.path,
      hasAccess: useRolePermission(FeaturesEnum.Invoice, PermissionEnum.View),
    },
    {
      id: 5,
      uniqueId: 'CreditNotes',
      label: t('SideNavigation.creditNotes'),
      path: PRIVATE_NAVIGATION.creditNotes.list.path,
      hasAccess: useRolePermission(FeaturesEnum.Invoice, PermissionEnum.View),
    },
  ];

  // const pipelineManagementSubMenu = [
  //   {
  //     id: 1,
  //     uniqueId: 'PipelineA',
  //     label: 'Pipeline A',
  //     path: PRIVATE_NAVIGATION.multiPipeline.pipelineA.view.path,
  //   },
  // ];

  const NAVIGATION_ITEM: NavigationItemType[] = [
    {
      icon: 'navHomeIcon',
      uniqueId: 'SideNavigation.dashboardTitle',
      label: t('SideNavigation.dashboardTitle'),
      path: PRIVATE_NAVIGATION.dashboard.view.path,
      hasAccess: useRolePermission(FeaturesEnum.Dashboard, PermissionEnum.View),
    },
    {
      icon: 'userStrokeSD',
      uniqueId: 'SideNavigation.userTitle',
      label: t('SideNavigation.userTitle'),
      hasAccess: ROLES.Admin === User?.role_name,
      isOpen: !!(
        allRoles.length > 0 &&
        userRoleSubmenu?.some((item) => item.uniqueId === activeData)
      ),
      path: null,
      ...(allRoles &&
        allRoles.length > 0 && {
          subRoute: [...userRoleSubmenu],
        }),
    },
    {
      icon: 'userStrokeSD',
      uniqueId: 'roles.Trainer',
      label: t('Calendar.eventDetails.trainerTitle'),
      hasAccess: ROLES.TrainingSpecialist === User?.role_name,
      path: PRIVATE_NAVIGATION.trainerDatabase.view.path,
    },
    {
      icon: 'notePencilStrokeSD',
      uniqueId: 'SideNavigation.trainerParent',
      label: t('Dashboard.Trainer.CourseInvitation.courses'),
      hasAccess: ROLES.Trainer === User?.role_name,
      // path: PRIVATE_NAVIGATION.trainerCourses.view.path,
      path: null,
      isOpen: trainerCourseSubMenu?.some((item) => item.uniqueId === activeData),
      subRoute: trainerCourseSubMenu,
    },
    {
      icon: 'ticketStrokeSD',
      uniqueId: 'SideNavigation.ticketTitle',
      label: t('SideNavigation.ticketTitle'),
      path: '#',
    },
    {
      icon: 'userStrokeSD',
      uniqueId: 'SideNavigation.client.companyTitle',
      label: t('SideNavigation.client.companyTitle'),
      hasAccess:
        ROLES.Accounting === User?.role_name || ROLES.SalesRep === User?.role_name,
      path: PRIVATE_NAVIGATION.accountingCompany.list.path,
    },
    {
      icon: 'userStrokeSD',
      uniqueId: 'SideNavigation.client.label',
      label: t('SideNavigation.client.label'),
      path: null,
      hasAccess: useRolePermission(FeaturesEnum.Company, PermissionEnum.View),
      isOpen: clientSubMenu?.some((item) => item.uniqueId === activeData),
      subRoute: clientSubMenu,
    },

    {
      icon: 'navCoursesManagementIcon',
      uniqueId: 'SideNavigation.coursesManagement',
      label: t('SideNavigation.coursesManagement'),
      isOpen: courseManagementSubMenu?.some((item) => item.uniqueId === activeData),
      path: null,
      subRoute: courseManagementSubMenu,
      hasAccess: useRolePermission(
        FeaturesEnum.CourseInvitations,
        PermissionEnum.View
      ),
    },
    {
      icon: 'navTemplateManagementIcon',
      uniqueId: 'SideNavigation.templateManagement',
      label: t('SideNavigation.TemplateManagement'),
      isOpen: templateManagement?.some((item) => item.uniqueId === activeData),
      path: null,
      subRoute: templateManagement,
      hasAccess: useRolePermission(
        FeaturesEnum.CourseInvitations,
        PermissionEnum.View
      ),
    },
    {
      icon: 'notePencilStrokeSD',
      uniqueId: 'SideNavigation.coursesTitle',
      label: t('SideNavigation.coursesTitle'),
      isOpen: coursesSubMenu?.some((item) => item.uniqueId === activeData),
      path: null,
      subRoute: coursesSubMenu,
      hasAccess: useRolePermission(
        FeaturesEnum.CourseInvitations,
        PermissionEnum.View
      ),
    },
    {
      icon: 'notePencilStrokeSD',
      uniqueId: 'SideNavigation.salesRepCoursesTitle',
      label: t('SideNavigation.coursesTitle'),

      path: PRIVATE_NAVIGATION.salesRepCourses.view.path,
      hasAccess: useRolePermission(FeaturesEnum.SalesRepCourse, PermissionEnum.View),
    },
    // {
    //   icon: 'navProjectPipelineIcon',
    //   uniqueId: 'SideNavigation.multiPipeline',
    //   label: 'Multi Pipeline',
    //   path: null,
    //   subRoute: pipelineManagementSubMenu,
    //   hasAccess: useRolePermission(
    //     FeaturesEnum.CourseInvitations,
    //     PermissionEnum.View
    //   ),
    // },
    {
      icon: 'navProjectPipelineIcon',
      uniqueId: 'SideNavigation.projectManagement',
      label: t('SideNavigation.projectPipeline'),
      path: PRIVATE_NAVIGATION.projectManagement.view.path,
      hasAccess: useRolePermission(
        FeaturesEnum.ProjectManagement,
        PermissionEnum.View
      ),
    },
    {
      icon: 'navCoursePipelineIcon',
      uniqueId: 'SideNavigation.courseManagement',
      label: t('SideNavigation.coursePipeline'),
      path: PRIVATE_NAVIGATION.coursePipeline.view.path,
      hasAccess: useRolePermission(FeaturesEnum.CoursePipeline, PermissionEnum.View),
    },
    {
      icon: 'calendarIcon2',
      uniqueId: 'Calendar',
      label: t('SideNavigation.calendarTitle'),
      path: PRIVATE_NAVIGATION.calendar.view.path,
      hasAccess: useRolePermission(FeaturesEnum.CalendarEvent, PermissionEnum.View),
    },
    {
      icon: 'hashIcon',
      uniqueId: 'Codes',
      label: t('SideNavigation.Codes'),
      path: PRIVATE_NAVIGATION.codes.view.path,
      hasAccess: useRolePermission(FeaturesEnum.Code, PermissionEnum.View),
    },
    {
      icon: 'hashIcon',
      uniqueId: 'AtecoCodes',
      label: t('SideNavigation.AtecoCodes'),
      path: PRIVATE_NAVIGATION.atecoCodes.view.path,
      hasAccess: useRolePermission(FeaturesEnum.AtecoCode, PermissionEnum.View),
    },
    {
      icon: 'navChatIcon',
      uniqueId: 'SideNavigation.chat',
      label: t('SideNavigation.chatTitle'),
      path: PRIVATE_NAVIGATION.chat.view.path,
      hasAccess: useRolePermission(FeaturesEnum.Chat, PermissionEnum.View),
    },

    {
      icon: 'navQuotesIcon',
      uniqueId: 'Quotes',
      label: t('SideNavigation.quotesTitle'),
      path: PRIVATE_NAVIGATION.quotes.list.path,
      hasAccess: useRolePermission(FeaturesEnum.Quote, PermissionEnum.View),
    },
    {
      icon: 'navEmailIcon',
      uniqueId: 'SideNavigation.emailParent',
      label: t('SideNavigation.emailParent'),
      path: null,
      isOpen: mailTemplateSubMenu?.some((item) => item.uniqueId === activeData),
      subRoute: mailTemplateSubMenu,
      hasAccess: useRolePermission(FeaturesEnum.Feature, PermissionEnum.View),
    },
    {
      icon: 'navCourseRequestIcon',
      uniqueId: 'SideNavigation.courseRequest',
      label: t('SideNavigation.CourseRequest'),
      path: PRIVATE_NAVIGATION.courseRequest.view.path,
      hasAccess: useRolePermission(FeaturesEnum.CourseRequest, PermissionEnum.View),
    },
    {
      icon: 'navSystemLogsIcon',
      uniqueId: 'systemLogTitle',
      label: t('systemLogTitle'),
      path: PRIVATE_NAVIGATION.systemLogs.view.path,
      hasAccess: useRolePermission(FeaturesEnum.SystemLog, PermissionEnum.View),
    },
    {
      icon: 'navPaymentIcon',
      uniqueId: 'SideNavigation.Payments',
      label: t('SideNavigation.Payments'),
      path: null,
      subRoute: paymentSubMenu.filter((data) => data.hasAccess),
      hasAccess: useRolePermission(FeaturesEnum.Payment, PermissionEnum.View),
    },
    {
      icon: 'navQuotesIcon',
      uniqueId: 'SideNavigation.TrainerInvoice',
      label: t('SideNavigation.TrainerInvoice'),
      path: PRIVATE_NAVIGATION.trainerInvoice.list.path,
      hasAccess: useRolePermission(FeaturesEnum.TrainerInvoice, PermissionEnum.View),
    },
    {
      icon: 'chartIcon',
      uniqueId: 'SideNavigation.Reports',
      label: t('SideNavigation.Reports'),
      path: PRIVATE_NAVIGATION.reports.list.path,
      hasAccess: useRolePermission(FeaturesEnum.Report, PermissionEnum.View),
    },
    {
      icon: 'expenseIcon',
      uniqueId: 'SideNavigation.Expense',
      label: t('SideNavigation.Expense'),
      path: PRIVATE_NAVIGATION.expense.view.path,
      hasAccess: useRolePermission(FeaturesEnum.Expense, PermissionEnum.View),
    },
  ];

  const [navigationList, setNavigationList] = useState(NAVIGATION_ITEM);
  useEffect(() => {
    let active;
    if (location === PRIVATE_NAVIGATION.notFoundPage) {
      dispatch(activeSidebar({ isActive: '', isOpen: false }));
      setTimeout(() => {
        setNavigationList(NAVIGATION_ITEM);
      }, 0);
    } else if (activeData === null) {
      dispatch(activeSidebar({ isActive: 'Dashboard', isOpen: true }));
    }

    navigationList.forEach((e) => {
      if (e.path === location) {
        active = e.uniqueId;
      } else if (e.subRoute) {
        e.subRoute.forEach((item) => {
          if (location === item.path) {
            active = item.uniqueId;
          }
        });
      }
    });

    if (active) {
      dispatch(activeSidebar({ isActive: active, isOpen: true }));
    }
  }, [location, i18next.language]);

  useEffect(() => {
    if (i18next.language) {
      setNavigationList(NAVIGATION_ITEM);
    }
  }, [roles, i18next.language, t('SideNavigation.dashboardTitle')]);

  const setActiveSubMenu = (activeSubmenu: string) => {
    let tempNavList = [...navigationList];
    const selectedMenu = tempNavList.findIndex(
      (data) => data.uniqueId === activeSubmenu
    );
    tempNavList = tempNavList.map((data) => {
      if (data.isOpen && tempNavList[selectedMenu].uniqueId !== data.uniqueId) {
        data.isOpen = false;
      }
      return data;
    });

    tempNavList[selectedMenu].isOpen = !tempNavList[selectedMenu].isOpen;
    setNavigationList(tempNavList);
  };

  const renderSidebar = () => {
    let sidebarStructure = navigationList.map((menuData) => {
      if (menuData.hasAccess) {
        return (
          <SideBarMenu
            key={`menu_${customRandomNumberGenerator()}`}
            activeData={activeData}
            menuData={menuData}
            hide={
              menuData.subRoute?.some((item) => item.uniqueId === activeData) ??
              activeData === menuData.uniqueId
            }
            setActiveSubMenu={setActiveSubMenu}
          />
        );
      }
      return null;
    });

    sidebarStructure = sidebarStructure.filter((data) => !!data);
    return sidebarStructure;
  };

  return (
    <div
      className={`sidebar-container ${
        openSidebar ? 'max-w-[270px]' : 'max-w-[100px]'
      } `}
    >
      <div className="px-4 pt-4">
        <Link to="/" className="block text-center">
          <Image
            src="/images/pe_full_logo.svg"
            imgClassName={`${
              openSidebar ? 'h-20' : 'h-10'
            } w-auto mx-auto block transition-all duration-500`}
            alt="pe_logo"
          />
        </Link>
      </div>
      <nav
        className="ps-4 py-6 pe-0 w-full flex flex-col flex-wrap overflow-hidden"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5 max-h-[calc(100dvh_-_130px)] overflow-auto no-scrollbar">
          {renderSidebar()}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
