"use client";

import {Button} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {useTranslation} from "react-i18next";
import {useGlobalStore} from "@/store/global";

export default function LogoutButton() {

  const { t } = useTranslation();

  const {logout} = useGlobalStore();

  return (
    <Button
      onClick={logout}
      sx={{ color: "#d32f2f!important" }}
      variant="outlined"
      className="flex gap-2 sm:w-auto w-full"
      color="error"
    >
      <LogoutIcon fontSize="small" />

      {t("fields.logout")}

    </Button>
  );
};
