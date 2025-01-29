import React, { useEffect, useState } from "react";
import { api } from "@/config";
import { User2Icon, MessageCircleIcon, NotebookIcon } from "lucide-react";

interface DashboardStats {
  totalComments: number;
  totalPosts: number;
  totalUsers: number;
  totalCategories: number;
  positiveSentimentNews: number;
  negativeSentimentNews: number;
  neutralSentimentNews: number;
}

export const StatCards = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalComments: 0,
    totalPosts: 0,
    totalUsers: 0,
    totalCategories: 0,
    positiveSentimentNews: 0,
    negativeSentimentNews: 0,
    neutralSentimentNews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/dashboard");
        if (data?.data) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Posts", value: stats.totalPosts, icon: <NotebookIcon size={32} /> },
    { title: "Total Users", value: stats.totalUsers, icon: <User2Icon size={32} /> },
    { title: "Total Comments", value: stats.totalComments, icon: <MessageCircleIcon size={32} /> },
    { title: "Total Categories", value: stats.totalCategories },
    { title: "Positive Sentiment News", value: stats.positiveSentimentNews },
    { title: "Negative Sentiment News", value: stats.negativeSentimentNews },
    { title: "Neutral Sentiment News", value: stats.neutralSentimentNews },
  ];

  return (
    <>
      {statCards.map((stat, index) => (
        <Card key={index} title={stat.title} value={stat.value} icon={stat.icon} />
      ))}
    </>
  );
};

const Card = ({ title, value, icon }: { title: string; value: number; icon?: React.ReactNode }) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-primary/70 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        {icon && <div>{icon}</div>}
      </div>
    </div>
  );
};
