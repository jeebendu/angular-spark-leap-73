
import { Country } from "@/admin/types/country";
import { District } from "@/admin/types/district";
import { State } from "@/admin/types/state";

export interface Branch {
    id: number;
    name: string;
    location: string;
    mapurl: string;
    pincode: number;
    code: string;
    country: Country;
    state: State;
    district: District;
    city: string;
}
