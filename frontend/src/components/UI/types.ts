export type DoorStats = "door_cycles_count" | "door_openings_count" | "door_closings_count";

export type DoorStatsCount = {
    dataKey: DoorStats;
    label: string;
    valueFormatter: (value: number) => string
};