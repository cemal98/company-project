import React, { JSX } from "react";
import { Link } from "react-router-dom";

type Props = {
  title?: string;
  totalValue?: number;
  values?: { subIcon: JSX.Element; subValue?: number }[];
  subtitle?: string;
  icon?: JSX.Element;
  bgColor?: string;
  url?: string;
};

const DashboardCard: React.FC<Props> = ({
  title,
  totalValue,
  values = [],
  subtitle,
  icon,
  bgColor = "#ffff",
  url,
}) => {
  return (
    <Link
      to={url || "#"}
      className="block h-full text-decoration-none hover:opacity-90 transition-opacity duration-300"
    >
      <div
      style={{backgroundColor: bgColor}}
        className={`relative h-full cursor-pointer rounded-lg border-l-4 p-4 shadow-lg`}
      >
        <div className="flex flex-col gap-y-4 text-center text-white">
          {title && (
            <div className="text-[20px] font-semibold">{title}</div>
          )}

          {totalValue && (
            <div className="flex flex-row items-center justify-center gap-x-4">
              <div className="text-[50px] font-bold">{totalValue}</div>
              {icon && <div className="text-[40px]">{icon}</div>}
            </div>
          )}

          {subtitle && (
            <div className="text-[14px] font-medium">{subtitle}</div>
          )}

          {values.length > 0 && (
            <div className="flex justify-center gap-x-6">
              {values.map((item, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  <div className="text-[22px] font-semibold">
                    {item.subValue}
                  </div>
                  <div>{item.subIcon}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
