import cx from "classnames";
import styles from "./react-clinic-drawing.module.css";

function Person({
  parts,
  doctor,
}: {
  parts: string[];
  doctor?: boolean;
}) {
  return (
    <div
      className={cx(
        styles.person,
        doctor ? styles.doctor : styles.patient
      )}
    >
      {parts.map((part, i) => (
        <div
          key={i}
          className={
            part === "arm-left"
              ? styles.armLeft
              : part === "arm-right"
                ? styles.armRight
                : styles[part as keyof typeof styles]
          }
        />
      ))}
    </div>
  );
}

export function ReactClinicDrawing() {
  return (
    <div className={styles.drawing}>
      <div className={styles.scene}>
        <Person parts={["head", "eyes", "body", "arm-left"]} />
        <div className={styles.laptop} />
        <Person parts={["thumb"]} />
        <Person
          doctor
          parts={[
            "head",
            "eyes",
            "eyebrows",
            "body",
            "scan",
            "arm-left",
            "stethoscope",
            "arm-right",
          ]}
        />
      </div>
    </div>
  );
}
