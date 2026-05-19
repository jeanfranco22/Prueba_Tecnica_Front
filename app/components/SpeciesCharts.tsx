"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CardProps } from "../types/CardTypes";

interface SpeciesChartProps {
  characters: CardProps[];
}

const SpeciesChart = ({ characters }: SpeciesChartProps) => {
  const speciesCount = characters.reduce<Record<string, number>>(
    (acc, character) => {
      const species = character.species || "Unknown";

      acc[species] = (acc[species] || 0) + 1;

      return acc;
    },
    {},
  );

  const data = Object.entries(speciesCount).map(([species, count]) => ({
    species,
    count,
  }));

  return (
    <div className="mb-8 rounded-2xl bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Characters by species
      </h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="species" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpeciesChart;
