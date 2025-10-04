export type typeLaunches = {
    mission_name: string;
    rocket: {
        rocket_name: string;
    };
    links: {
        mission_patch: string | null;
        mission_patch_small: string | null;
    };
    details: string | null;
};