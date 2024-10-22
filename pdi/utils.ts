import Pdi from "./model";

export async function GeneratePdiName(
  motor_hp: string,
  head_size: string,
  orderid: string
) {
  let basePdiName = `${motor_hp}hp-${head_size}m`; // Base PDI name
  let generatedPdiName = basePdiName;
  let counter = 1;
  let existingPdi;
  do {
    existingPdi = await Pdi.findOne({
      where: {
        orderId: orderid,
        pdi_Name: generatedPdiName,
      },
    });
    if (existingPdi) {
      generatedPdiName = `${basePdiName}-${counter}`;
      counter++;
    }
  } while (existingPdi);
  return generatedPdiName;
}

export async function extractMotorHpAndHeadSize(data: string) {
  const [motorHpPart, headSizePart] = data.split("-");
  const motorHp = motorHpPart.replace("hp", "").trim();
  const headSize = headSizePart.replace("m", "").trim();
  return {
    motorHp,
    headSize,
  };
}
