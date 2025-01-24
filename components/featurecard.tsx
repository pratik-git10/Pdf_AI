import { motion } from "framer-motion";
import { IconProps } from "@tabler/icons-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      <div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
        <Icon size={24} />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-center text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
}
