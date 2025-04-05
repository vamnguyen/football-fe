"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { matchesFilterSchema, MatchesFilterSchemaType } from "@/lib/validation";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TeamLogo } from "@/components/shared/team-logo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { UpcomingMatchesSkeleton } from "@/components/skeleton/upcoming-matches-skeleton";
import { Pagination } from "@/components/shared/pagination";
import { format } from "date-fns";
import { useGetCompetitionList } from "@/hooks/football-data/competition/use-get-competition-list";
import { useGetCompetitionMatches } from "@/hooks/football-data/match/use-get-competition-matches";
import { Match } from "@/lib/interface";
import { MATCH_STATUS } from "@/lib/constants";
import { toast } from "sonner";
interface MatchFilters {
  dateFrom?: string;
  dateTo?: string;
  season?: string;
}

export function UpcomingMatches() {
  const { data: competitions } = useGetCompetitionList();
  const [selectedCompetition, setSelectedCompetition] = useState<string>("PL");
  const [selectedStatus, setSelectedStatus] = useState<string>("SCHEDULED");
  const [filters, setFilters] = useState<MatchFilters>({});

  const form = useForm<MatchesFilterSchemaType>({
    resolver: zodResolver(matchesFilterSchema),
    defaultValues: {
      dateFrom: "",
      dateTo: "",
      season: "",
    },
  });

  const onSubmit = (data: MatchesFilterSchemaType) => {
    if (!data.dateFrom && !data.dateTo && !data.season) {
      toast.error("Please select at least one filter");
      return;
    }

    if (data.season && data.season.length !== 4) {
      toast.error("Season must be 4 digits");
      return;
    }

    setFilters(data);
  };

  const {
    data: matches,
    isLoading,
    isError,
    error,
  } = useGetCompetitionMatches({
    code: selectedCompetition,
    status: selectedStatus,
    ...filters,
  });

  const [page, setPage] = useState(1);
  const limit = 6;

  if (isLoading) {
    return <UpcomingMatchesSkeleton />;
  }

  if (isError && error) {
    toast.error(error.message);
  }

  const filteredMatches =
    matches?.filter((match: Match) => match.status === selectedStatus) || [];

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">HOT Matches 🔥</h2>
          <div className="flex gap-2">
            <Select
              value={selectedCompetition}
              onValueChange={setSelectedCompetition}
            >
              <SelectTrigger className="min-w-[180px]">
                <SelectValue placeholder="Select Competition" />
              </SelectTrigger>
              <SelectContent>
                {competitions?.map((competition) => (
                  <SelectItem key={competition.id} value={competition.code}>
                    {competition.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
            <TabsList className="grid w-full grid-cols-3">
              {Object.entries(MATCH_STATUS).map(([key, value]) => (
                <TabsTrigger key={key} value={value}>
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Form {...form}>
            <form className="flex gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="dateFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Date From (e.g. 2023-01-01)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateTo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Date To (e.g. 2023-01-01)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Season (e.g. 2024)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>Apply Filters</Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset();
                  setFilters((prev) => ({
                    ...prev,
                    dateFrom: "",
                    dateTo: "",
                    season: "",
                  }));
                }}
              >
                Clear Filters
              </Button>
            </form>
          </Form>
        </div>

        {filteredMatches.length === 0 ? (
          <div className="text-center py-8 text-primary">No matches found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMatches
                .slice((page - 1) * limit, page * limit)
                .map((match: Match) => (
                  <Card
                    key={match.id}
                    className="hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <CardHeader className="gap-1">
                      <div className="flex items-center justify-between gap-4">
                        <TeamLogo
                          logo={match.homeTeam.crest}
                          teamName={match.homeTeam.name}
                          size="lg"
                        />
                        <span className="text-lg font-semibold">VS</span>
                        <TeamLogo
                          logo={match.awayTeam.crest}
                          teamName={match.awayTeam.name}
                          size="lg"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Badge variant="outline" className="mt-2">
                          {match.status}
                        </Badge>
                        <Badge>{match.competition.name}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center pb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-sm text-primary">
                          Matchday {match.matchday}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-primary">
                          {format(new Date(match.utcDate), "MMM dd, yyyy")}
                        </span>
                      </div>
                      {match.status === "FINISHED" && match.score && (
                        <div className="mt-4 space-y-2">
                          <div className="text-lg font-bold">
                            {match.score.fullTime.home} -{" "}
                            {match.score.fullTime.away}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Winner: {match.score.winner}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Duration: {match.score.duration}
                          </div>
                          {match.score.halfTime && (
                            <div className="text-sm text-muted-foreground">
                              Half Time: {match.score.halfTime.home} -{" "}
                              {match.score.halfTime.away}
                            </div>
                          )}
                          {match.referees && match.referees.length > 0 && (
                            <div className="text-sm text-muted-foreground">
                              Referee: {match.referees[0].name}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link href={`/predictions/${match.id}`}>
                          View Details & Predict
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            <Pagination
              page={page}
              limit={limit}
              totalResults={filteredMatches.length}
              totalPages={Math.ceil(filteredMatches.length / limit)}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </>
  );
}
