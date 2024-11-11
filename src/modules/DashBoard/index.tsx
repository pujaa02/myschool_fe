// ** Import Packages **
import { Fragment } from 'react';

// ** Components **


const Dashboard = () => {
  // // ** states **
  // const [recentLogsFlag, setRecentLogsFlag] = useState<boolean>(false);
  // const [pageInfo, setPageInfo] = useState<{
  //   page: number;
  //   hasMore: boolean;
  // }>({ hasMore: true, page: 1 });
  // const [refresh, setRefresh] = useState(false);

  return (
    <Fragment>
      <p className="text-[15px] font-biotif__Regular text-black__TextColor400 mb-[12px]">
        Here's what's happening with organization today.
      </p>
      {/* <DashboardCountShow
        {...{ setPageInfo, setRecentLogsFlag, recentLogsFlag }}
        refresh={refresh}
      /> */}
      <div className="w-auto ml-[-10px] mr-[-10px] flex flex-wrap">
        {/* <UpcomingActivitiesForDashBoard
          {...{ setPageInfo, pageInfo, setRecentLogsFlag }}
          refresh={refresh}
        />
        <RecentLogs
          recentLogsFlag={recentLogsFlag}
          setRefresh={setRefresh}
          refresh={refresh}
        /> */}
      </div>
      {/* <DashboardCharts />
      <DashboardStreamLogs /> */}
    </Fragment>
  );
};

export default Dashboard;
