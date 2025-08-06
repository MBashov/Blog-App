import { HttpHeaders } from "@angular/common/http";
import { getAccessToken } from "./getAccessToken";

const accessToken: string | null = getAccessToken();

export const authHeaders = (): HttpHeaders => {
    return new HttpHeaders({
        Authorization: `Bearer ${accessToken}`
    });
}
