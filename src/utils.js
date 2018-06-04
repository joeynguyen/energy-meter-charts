import meterReadings from './meters.json';

export function getMeterData() {
  let uniqueMeters = {};
  meterReadings.data.forEach(meterReading => {
    const meterId = meterReading.Meter_ID;
    const meterType = meterReading.Type;
    const meterReadingKeys = Object.keys(meterReading);

    let totalKwH = 0;
    meterReadingKeys.forEach(key => {
      // if key is a number type
      if (isFinite(Number(key))) {
        // JS hack add numbers with decimals
        totalKwH = (totalKwH * 1000 + meterReading[key] * 1000) / 1000;
      }
    });

    // if meterId doesn't exist, add it
    if (!uniqueMeters[meterId]) {
      uniqueMeters[meterId] = {
        [meterType]: {
          [meterReading.Date]: totalKwH,
        },
      };
    }
    // if this Type doesn't exist yet for this meterId, add it
    else if (!uniqueMeters[meterId][meterType]) {
      uniqueMeters[meterId][meterType] = {
        [meterReading.Date]: totalKwH,
      };
    }
    // else, append new data
    else {
      uniqueMeters[meterId][meterType][meterReading.Date] = totalKwH;
    }
  });

  return uniqueMeters;
}
