import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useSnackbar } from 'notistack';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { tracking, accounts } = props;

  // customized
  const action = key => (
    <React.Fragment>
      <Button onClick={() => { alert(`I belong to snackbar with key ${key}`); }}>
        View Item
      </Button>
      <Button onClick={() => { closeSnackbar(key) }}>
        Dismiss
      </Button>
    </React.Fragment>
  );

  useEffect(() => {
    const results2 = tracking.events._eTransferToken({ fromBlock: 0, toBlock: 'latest' }, function (err, result) {
      if (err) {
        console.log(err)
        return;
      }
      console.log(result)

      const owner = result.returnValues._receiver
      const tokenHash = result.returnValues._tokenHash
      const ingridientID = result.returnValues._ingridientID
      generateSnacks(ingridientID, tokenHash, owner)
    })
  }, [])

  async function generateSnacks(ingridientID, tokenHash, owner) {

    const tknD = await tracking.methods.getTokenData(ingridientID, tokenHash).call()
    console.log(tknD)
    if (accounts === owner && tknD[0] == 2 && tknD[2] != accounts) {
      enqueueSnackbar("Pending receive token", {
        variant: 'info',
        key: tokenHash,
        persist: true,
        action,
      })
    }
  }

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        accounts={props.accounts}
        tracking={props.tracking}
        management={props.management}
        web3={props.web3}
        isadmin={props.isadmin}
      />
    </>
  );
};