import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
    title: string;
    value: number | string;
    icon: LucideIcon;
    variant?: 'primary' | 'secondary' | 'accent';
};

const variantClasses = {
    primary: 'bg-blue-900/50 border-blue-700',
    secondary: 'bg-yellow-900/50 border-yellow-700',
    accent: 'bg-green-900/50 border-green-700',
};

const iconVariantClasses = {
    primary: 'text-blue-400',
    secondary: 'text-yellow-400',
    accent: 'text-green-400',
}

export default function StatsCard({ title, value, icon: Icon, variant = 'primary' }: StatsCardProps) {
    return (
        <Card className={cn("border-2 shadow-lg backdrop-blur-sm", variantClasses[variant])}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
                <Icon className={cn("h-5 w-5", iconVariantClasses[variant])} />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}
