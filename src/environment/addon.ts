export type WealthicaAPI = {
  addon: WealthicaAddon;
  options?: WealthicaAddonOptions | undefined;
};
export type WealthicaAddon = {
  on: (
    event: string,
    options: (options: WealthicaAddonOptions) => void
  ) => void;
};
export type WealthicaAddonOptions = {};

const Addon = (window as any).Addon;

export const wealthica: WealthicaAPI = {
  addon: new Addon(),
};
