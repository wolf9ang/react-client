import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import useResponsive from "../../hooks/useResponsive";

import Main from "./Main";
import Header from "./header";
import NavMini from "./nav/NavMini";
import NavVertical from "./nav/NavVertical";
import { useSettingsContext } from "../../components/settings";


export default function MainLayout() {
  const { themeLayout } = useSettingsContext();

  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  const isNavMini = themeLayout === 'mini';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  if (isNavMini) {
    return (
      <>
        <Header onOpenNav={handleOpen} />

        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {isDesktop ? <NavMini /> : renderNavVertical}

          <Main>
            <Outlet />
          </Main>
        </Box>
      </>
    )
  }
  
  return (
    <>
      <Header onOpenNav={handleOpen} />
      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}
        <Main>
          <Outlet />
        </Main>
      </Box>
    </>

  )
}
