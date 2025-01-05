import AppleHealthKit, { 
  HealthValue, 
  HealthPermission
} from 'react-native-health';
import { NativeEventEmitter, NativeModules } from 'react-native';

type HealthData = {
  type: string;
  value: number;
  date: Date;
};

type HealthKitConfig = {
  permissions: {
    read: HealthPermission[];
    write: HealthPermission[];
  };
};

export class HealthSyncService {
  private healthKit: typeof AppleHealthKit = AppleHealthKit;
  private healthEventEmitter: NativeEventEmitter;

  constructor() {
    this.healthEventEmitter = new NativeEventEmitter(NativeModules.AppleHealthKit);
    this.initializeHealthKit();
  }

  private async initializeHealthKit(): Promise<void> {
    const permissions: HealthKitConfig = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.Steps,
          AppleHealthKit.Constants.Permissions.HeartRate,
          AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
          AppleHealthKit.Constants.Permissions.Weight,
          AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
          AppleHealthKit.Constants.Permissions.BloodPressureSystolic
        ],
        write: [
          AppleHealthKit.Constants.Permissions.Steps,
          AppleHealthKit.Constants.Permissions.Weight
        ]
      }
    };

    try {
      await this.healthKit.initHealthKit(permissions, (error: string) => {
        if (error) {
          console.error('Failed to initialize HealthKit:', error);
          return;
        }
        this.setupHealthObservers();
      });
    } catch (error) {
      console.error('Failed to initialize HealthKit:', error);
    }
  }

  private setupHealthObservers(): void {
    this.healthEventEmitter.addListener('healthKit:steps', (results: HealthValue) => {
      this.syncHealthData('steps', results);
    });

    this.healthEventEmitter.addListener('healthKit:heartRate', (results: HealthValue) => {
      this.syncHealthData('heartRate', results);
    });
  }

  private async storeHealthData(data: HealthData): Promise<void> {
    // Implementation for storing health data
    console.log('Storing health data:', data);
  }

  private async syncHealthData(type: string, data: HealthValue): Promise<void> {
    await this.storeHealthData({
      type,
      value: data.value,
      date: new Date(data.startDate)
    });
  }
} 