import {Button} from "@mui/material";
import Image from "next/image";
import twitter from "/public/social-media/x-logo.png";
import facebook from "/public/social-media/facebook-logo.webp";
import whatsapp from "/public/social-media/whatsapp-logo.png";
import Link from "next/link";
import {useMemo} from "react";
import {FRONT_URL} from "../../../../api/constants";

export default function ShareButtons({locale, product_id}) {
    const share_link = `${FRONT_URL}/${locale}/products/${product_id}`;
    const social_media = useMemo(() => (
        [
            {
                id: "1",
                link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(share_link)}`,
                icon: <Image className="size-5 object-contain" src={twitter} alt="X / twitter" width={20} height={20}/>,
            },
            {
                id: "2",
                link: `https://wa.me/?text=${encodeURIComponent(share_link)}`,
                icon: <Image className="size-5 object-contain" src={whatsapp} alt="X / twitter" width={20} height={20}/>,
            },
            {
                id: "3",
                link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(share_link)}`,
                icon: <Image className="size-5 object-contain" src={facebook} alt="X / twitter" width={20} height={20}/>,
            },
        ]
    ), []);
     
    return (
        <div className="flex gap-4">
        
        {social_media.map((item, i) => {
            return (
                <Button target="_blank" component={Link} href={item.link} key={i} sx={{padding:0, minWidth:0}}>
                    {item.icon}
                </Button>
            );
        })}
        </div>
    );
}
