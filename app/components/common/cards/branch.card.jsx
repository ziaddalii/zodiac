import {Card, Divider} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function BranchCard({item, locale}) {
    return (
        <a href={`#${item.id}`}>
            <Card id={`branch-${item.id}`} variant="outlined" className="shadow-sm p-4 space-y-2 col-span-1 space-y-2">

                <div className="flex items-center gap-2">
                    <LocationOnIcon color="accent"/>
                    <h2 className="text-xl font-bold">{item.names[locale]}</h2>
                </div>

                <Divider/>

                <div dangerouslySetInnerHTML={{__html: item.embed}}></div>
            </Card>

        </a>
    );
}