export const Feature = {
  CAR_DAMAGE_DETECTION: 'car_damage_detection',
  THREE_D_VISUALIZATION: '3d_visualization',
  DATA_ANALYSIS: 'data_analysis',
  PRICE_ESTIMATION: 'price_estimation',
} as const;

export type Feature = typeof Feature[keyof typeof Feature];

export const FeatureOptions = [
  { value: Feature.CAR_DAMAGE_DETECTION, label: 'Car Damage Detection' },
  { value: Feature.THREE_D_VISUALIZATION, label: '3D visualization' },
  { value: Feature.DATA_ANALYSIS, label: 'Data Analysis' },
  { value: Feature.PRICE_ESTIMATION, label: 'Price estimation' },
] as const;
