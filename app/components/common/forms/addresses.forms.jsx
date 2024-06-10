"use client";
import {useState} from "react";
import {isString} from "lodash-es";
import {post_addresses} from "../../../../api/requests/profile.requests";
import {notify} from "../global-snack-bar.common";
import {Box, Button, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddressDialog from "../dialogs/address.dialogs";
import AddIcon from "@mui/icons-material/Add";
import {ConfirmationDialog} from "../dialogs/confirmation.dialogs";
import {useTranslation} from "react-i18next";

const AddressesForm = ({ locale, original_address, countries, provinces, cities }) => {

  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [open, setOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [addresses, setAddresses] = useState(original_address);
  const [current_index, set_current_index] = useState(null);
  const [selected_address, set_selected_address] = useState();

  const { t } = useTranslation();

  const handle_on_edit = (index) => {
    set_current_index(index);
    if (original_address && original_address[index]) {
      set_selected_address(original_address[index]);
    }
    setOpen(true);
  };

  const handleClickOpenAddAddress = () => {
    set_selected_address(false);
    setOpen(true);
  };

  const handleCloseAddAddress = () => {
    setOpen(false);
  };

  const handleClose = () => {
    set_current_index(null);
    setOpen(false);
    set_selected_address(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const delete_address = async () => {
    const body = {
      addresses: [
        {
          id: selected_address?.id,
        },
      ],
    };

    const result = await post_addresses(body, locale);
    if (isString(result)) {
      notify(true, result);
    } else {
      notify(false, t("messages.operation-completed"));
      setAddresses(result.data.addresses);
      set_selected_address(null);
    }
  };

  return (
    <Box className="space-y-8 p-8 border border-1 rounded-lg" component="form">
      <div className="flex justify-between items-center flex-wrap">

        <h2 className="font-bold">{t("fields.addresses")}</h2>

        <Button
          variant="outlined"
          className="flex gap-2"
          onClick={handleClickOpenAddAddress}
        >
          <AddIcon />
          {t("fields.add")}
        </Button>
      </div>

      {/* Address */}
      <div className="space-y-2">
        {addresses.length === 0 ? (
          <p className="text-center">{t("messages.empty-addresses")}</p>
        ) : (
          addresses.map((address, i) => {
            return (
              <div className="flex gap-4" key={i}>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ padding: "0" }}
                  onClick={() => handle_on_edit(i)}
                >
                  <Typography id={`address ${i + 1}`} variant="body2">
                    {address.name}
                  </Typography>
                </Button>

                <Button
                  onClick={() => {
                    set_selected_address(address);
                    setShowConfirmDialog(true);
                  }}
                  sx={{
                    height: "100%",
                    padding: "1rem",
                    minWidth: "0",
                    aspectRatio: "1",
                  }}
                  variant="text"
                >
                  <CloseIcon />
                </Button>
              </div>
            );
          })
        )}
      </div>

      <ConfirmationDialog
        t={t}
        show={showConfirmDialog}
        onConfirm={() => delete_address()}
        onClose={() => {
          setShowConfirmDialog(false);
          set_selected_address(null);
        }}
      />

      <AddressDialog
        original_address={selected_address}
        open={open}
        countries={countries}
        provinces={provinces}
        cities={cities}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default AddressesForm;
