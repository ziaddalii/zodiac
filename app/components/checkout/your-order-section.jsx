"use client";
import {useTranslation} from "react-i18next";
import CartMenuCard from "../common/cards/cart-menu.card";
import {useCartList} from "@/store/cart-list";
import {useEffect, useState} from "react";
import {LoadingLayout} from "../layout/loading.layout";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const YourOrderSection = ({checkout, locale}) => {

    const {t} = useTranslation();
    const {set_cart_list, cart_list} = useCartList();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        set_cart_list({total: checkout.total, details: checkout.cart});
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <article className="col-span-1 relative p-4 space-y-4 border-secondary border">
            <LoadingLayout loading={isLoading} isEmpty={cart_list.length === 0}
                           empty={<article className="flex flex-col justify-center items-center">
                               <h2 className="text-2xl">{t("messages.empty-products")}</h2>
                               <ErrorOutlineIcon sx={{height: "16rem", width: "16rem"}}/>
                           </article>}>

                <h2 className="text-2xl text-center">{t("fields.your-order")}</h2>

                {/* Products */}
                <h2 className="text-xl">{t("fields.products")}</h2>

                <div className="space-y-2 h-[80%] overflow-y-auto">
                    {cart_list.map((product) => {
                        // return <OrderProductCard key={product.id} product={product} locale={locale} />;
                        return (
                            <CartMenuCard
                                with_update={false}
                                with_delete={false}
                                key={product.id}
                                product={product}
                                locale={locale}
                            />
                        );
                    })}
                </div>

                {/* Cost Informations */}
                {/* <article className="w-full absolute bottom-4 left-0 px-4">
              <div className="flex justify-between items-center">
                  <h2 className="font-bold">{t("fields.subtotal")}</h2>
                  <span className="font-bold">
                      {checkout.total} {t("Cart.EGP")}
                  </span>
              </div>
              <div className="flex justify-between items-center">
                  <h2 className="font-bold">{t("orders.shipping_fees")}</h2>
                  <span className="font-bold">
                      {checkout.shippingFee} {t("Cart.EGP")}
                  </span>
              </div>
              <FormControl className="!mt-4">
                  <h2 className="font-bold">{t("checkout.payment_method")}</h2>
                  <RadioGroup
                      defaultValue={"cash on delivery"}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                  >
                      <FormControlLabel value="cash on delivery" control={<Radio />} label={t("checkout.cash")} />
                      <FormControlLabel value="pay with visa" control={<Radio />} label={t("checkout.visa")} />
                  </RadioGroup>
              </FormControl>
              <p className="text-lg text-center">
                  {t("checkout.agreement")}{" "}
                  <Link className="font-bold hover:underline" href="/privacy">
                      {t("Footer.Privacy Policy")}
                  </Link>
              </p>
              <Button
                  variant="contained"
                  color="success"
                  sx={{ display: "block", marginInline: "auto", marginTop: "1rem" }}
              >
                  {t("checkout.complete_order")}
              </Button>
          </article> */}
            </LoadingLayout>
        </article>
    );
};

export default YourOrderSection;
