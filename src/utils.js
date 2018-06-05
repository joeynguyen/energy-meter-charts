import meterReadings from './meters.json';

export function getPointStartDate(BaseLoad) {
  const startDate = Object.keys(BaseLoad)[0];
  const startDateArr = startDate.split('-');

  return Date.UTC(
    Number(startDateArr[0]),
    Number(startDateArr[1]),
    Number(startDateArr[2])
  );
}

function getDailyEnergyUsage(meterReading) {
  const meterReadingKeys = Object.keys(meterReading);
  let totalKwH = 0;

  meterReadingKeys.forEach(key => {
    // if key is a number type
    if (isFinite(Number(key))) {
      // JS hack for adding numbers with decimals
      totalKwH = (totalKwH * 1000 + meterReading[key] * 1000) / 1000;
    }
  });

  return totalKwH;
}

export function getMeterData() {
  let uniqueMeters = {};
  let uniqueMetersMap = new Map();
  meterReadings.data.forEach(meterReading => {
    const meterId = meterReading.Meter_ID;
    const meterType = meterReading.Type;

    const totalKwH = getDailyEnergyUsage(meterReading);

    if (!uniqueMeters[meterId]) {
      // if meterId doesn't exist, add it
      uniqueMeters[meterId] = {
        [meterType]: {
          [meterReading.Date]: totalKwH,
        },
      };
    } else if (!uniqueMeters[meterId][meterType]) {
      // if this Type doesn't exist yet for this meterId, add it
      uniqueMeters[meterId][meterType] = {
        [meterReading.Date]: totalKwH,
      };
    } else {
      // else, append new data
      uniqueMeters[meterId][meterType][meterReading.Date] = totalKwH;
    }
  });

  return uniqueMeters;
}
