"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useCartList } from "@/store/cart-list";

import QuantityCounterButtons from "../common/buttons/quantity.buttons";
import { format_price } from "../../../util/common";
import RemoveCartButtons from "../common/buttons/remove-cart.buttons";
import { LoadingLayout } from "../layout/loading.layout";

export default function CartTable({ cart, locale }) {
  const { t } = useTranslation();
  const { update_cart_list, set_cart_list, cart_list } = useCartList();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    set_cart_list(cart);
    setTimeout(() => setIsLoading(false), 2000);
  }, []);
  return (
    <div>
      
            <LoadingLayout
              loading={isLoading}
              isEmpty={cart_list.length === 0}
              empty={<TableRow>
                  <TableCell colSpan={12}>
                    <p className="text-center">{t("messages.empty-cart")}</p>
                  </TableCell>
                </TableRow>
              }
            >

            <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow className="text-lg uppercase">
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{t("fields.product")}</TableCell>
              <TableCell>{t("fields.price")}</TableCell>
              <TableCell>{t("fields.size")}</TableCell>
              <TableCell>{t("fields.color")}</TableCell>
              <TableCell>{t("fields.quantity")}</TableCell>
              <TableCell>{t("fields.subtotal")}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
              {cart_list.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <RemoveCartButtons product={item} />
                  </TableCell>

                  <TableCell>
                    <Image
                      className="w-20 object-contain"
                      width={200}
                      height={200}
                      alt={item.details.photos.alt}
                      src={item.details.photos.card}
                    />
                  </TableCell>
                  <TableCell>{item.details.names[locale]}</TableCell>

                  <TableCell>
                    {t("fields.egp")}
                    {item.details.variant.prices.discount !== 0
                      ? format_price(item.details.variant.prices.discount)
                      : format_price(item.details.variant.prices.normal)}
                  </TableCell>

                  <TableCell>
                    {item.details.variant.size.names[locale]}
                  </TableCell>

                  <TableCell>
                    <div
                      style={{ backgroundColor: item.details.color.color.hex }}
                      className="border rounded-full aspect-square size-8"
                    ></div>
                  </TableCell>

                  <TableCell>
                    <QuantityCounterButtons
                      init={item.quantity}
                      maxQuantity={item.details.color.stock}
                      onUpdate={(new_quantity) =>
                        update_cart_list(
                          item.details,
                          item.details.variant,
                          item.details.color,
                          new_quantity
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {t("fields.egp")} {format_price(item.details.total)}
                  </TableCell>
                </TableRow>
              ))}

              </TableBody>
              </Table>
            </TableContainer>
            </LoadingLayout>

    </div>
  );
}
