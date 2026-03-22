import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";
import { getSupabaseClient } from "../utils/supabase";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  createdAt: string;
}

interface JournalProps {
  onClose: () => void;
}

const OWNER_EMAIL = process.env.REACT_APP_JOURNAL_OWNER_EMAIL;
const TRACKER_DAYS = 540;

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getHeatColorClass = (amount: number, maxAmount: number, inRange: boolean) => {
  if (!inRange) {
    return "bg-transparent";
  }

  if (amount === 0) {
    return "bg-secondary/10 dark:bg-darkTertiary/20";
  }

  const ratio = maxAmount > 0 ? amount / maxAmount : 0;

  if (ratio <= 0.33) {
    return "bg-secondary/35 dark:bg-darkTertiary/40";
  }

  if (ratio <= 0.66) {
    return "bg-accent/70 dark:bg-darkAccent/70";
  }

  return "bg-accent dark:bg-darkAccent";
};

function Journal({ onClose }: JournalProps) {
  const supabase = getSupabaseClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const [isSavingEntry, setIsSavingEntry] = useState(false);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editMood, setEditMood] = useState("");
  const [isUpdatingEntryId, setIsUpdatingEntryId] = useState<string | null>(null);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [authError, setAuthError] = useState("");
  const [entryError, setEntryError] = useState("");
  const heatmapScrollContainerRef = useRef<HTMLDivElement | null>(null);

  const isSubmitDisabled = title.trim().length < 1;
  const hasSupabaseConfig = Boolean(supabase);

  const loadEntries = useCallback(async (userId: string) => {
    if (!supabase) {
      return;
    }

    setIsLoadingEntries(true);
    setEntryError("");

    const { data, error } = await supabase
      .from("journal_entries")
      .select("id, title, content, mood, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      setEntryError(error.message);
      setIsLoadingEntries(false);
      return;
    }

    setEntries(
      (data ?? []).map((row) => ({
        id: row.id as string,
        title: (row.title as string) ?? "",
        content: (row.content as string | null) ?? "",
        mood: (row.mood as string | null) ?? "",
        createdAt: row.created_at as string,
      }))
    );
    setIsLoadingEntries(false);
  }, [supabase]);

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      return;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) {
        return;
      }
      setSession(data.session ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [hasSupabaseConfig, supabase]);

  useEffect(() => {
    if (!isCreateFormOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCreateFormOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isCreateFormOpen]);

  useEffect(() => {
    if (!session?.user?.id) {
      setEntries([]);
      return;
    }

    const emailAddress = session.user.email ?? "";
    if (OWNER_EMAIL && emailAddress.toLowerCase() !== OWNER_EMAIL.toLowerCase()) {
      setAuthError("This account is not authorized for journal access.");
      if (supabase) {
        supabase.auth.signOut();
      }
      setEntries([]);
      return;
    }

    loadEntries(session.user.id);
  }, [loadEntries, session]);

  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)),
    [entries]
  );

  const entriesByDate = useMemo(() => {
    const groupedEntries = new Map<string, JournalEntry[]>();

    sortedEntries.forEach((entry) => {
      const dateKey = toDateKey(new Date(entry.createdAt));
      const dayEntries = groupedEntries.get(dateKey) ?? [];
      dayEntries.push(entry);
      groupedEntries.set(dateKey, dayEntries);
    });

    return groupedEntries;
  }, [sortedEntries]);

  const heatmapData = useMemo(() => {
    const activityByDate = new Map<string, { entries: number; textAmount: number }>();

    sortedEntries.forEach((entry) => {
      const dateKey = toDateKey(new Date(entry.createdAt));
      const current = activityByDate.get(dateKey) ?? { entries: 0, textAmount: 0 };
      const textAmount =
        entry.title.trim().length +
        entry.content.trim().length +
        entry.mood.trim().length;

      activityByDate.set(dateKey, {
        entries: current.entries + 1,
        textAmount: current.textAmount + textAmount,
      });
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const rangeStart = new Date(today);
    rangeStart.setDate(today.getDate() - TRACKER_DAYS + 1);

    const alignedStart = new Date(rangeStart);
    alignedStart.setDate(rangeStart.getDate() - rangeStart.getDay());

    const alignedEnd = new Date(today);
    alignedEnd.setDate(today.getDate() + (6 - today.getDay()));

    const days: Array<{
      key: string;
      date: Date;
      entries: number;
      textAmount: number;
      inRange: boolean;
      isToday: boolean;
    }> = [];

    for (const date = new Date(alignedStart); date <= alignedEnd; date.setDate(date.getDate() + 1)) {
      const key = toDateKey(date);
      const inRange = date >= rangeStart && date <= today;
      const activity = inRange ? activityByDate.get(key) : undefined;
      days.push({
        key,
        date: new Date(date),
        entries: activity?.entries ?? 0,
        textAmount: activity?.textAmount ?? 0,
        inRange,
        isToday: key === toDateKey(today),
      });
    }

    const weeks: typeof days[] = [];
    for (let index = 0; index < days.length; index += 7) {
      weeks.push(days.slice(index, index + 7));
    }

    const maxTextAmount = days.reduce(
      (currentMax, day) => (day.inRange && day.textAmount > currentMax ? day.textAmount : currentMax),
      0
    );

    const totalEntries = days.reduce((sum, day) => sum + (day.inRange ? day.entries : 0), 0);
    const totalTextAmount = days.reduce((sum, day) => sum + (day.inRange ? day.textAmount : 0), 0);

    const lastMonthStart = new Date(today);
    lastMonthStart.setDate(today.getDate() - 29);

    const pastMonthTextAmount = days.reduce((sum, day) => {
      if (!day.inRange) {
        return sum;
      }

      return day.date >= lastMonthStart ? sum + day.textAmount : sum;
    }, 0);

    const monthStarts = weeks.map((week) => {
      const firstDay = week[0];
      if (!firstDay || !firstDay.inRange || firstDay.date.getDate() > 7) {
        return null;
      }

      return firstDay.date.toLocaleString("default", { month: "short" });
    });

    return { weeks, monthStarts, maxTextAmount, totalEntries, totalTextAmount, pastMonthTextAmount };
  }, [sortedEntries]);

  const displayedEntries = useMemo(() => {
    if (!selectedDateKey) {
      return sortedEntries;
    }

    return entriesByDate.get(selectedDateKey) ?? [];
  }, [entriesByDate, selectedDateKey, sortedEntries]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (!heatmapScrollContainerRef.current) {
        return;
      }

      const { scrollWidth, clientWidth } = heatmapScrollContainerRef.current;
      heatmapScrollContainerRef.current.scrollLeft = Math.max(scrollWidth - clientWidth, 0);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [heatmapData.weeks.length]);

  const handleHeatmapWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!heatmapScrollContainerRef.current || event.deltaY === 0) {
      return;
    }

    event.preventDefault();
    heatmapScrollContainerRef.current.scrollLeft -= event.deltaY;
  };

  const ghostButtonClass =
    "px-3 py-2 rounded-lg text-sm font-semibold text-primary dark:text-darkLight bg-secondary/10 dark:bg-darkTertiary/20 border border-secondary/25 dark:border-darkTertiary/40 shadow-sm hover:bg-secondary/20 dark:hover:bg-darkTertiary/35 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] transition-all";
  const textActionButtonClass =
    "text-sm font-semibold text-secondary dark:text-darkTertiary hover:opacity-70 hover:underline underline-offset-2 active:scale-[0.98] transition-all";
  const primaryButtonClass =
    "btn-primary shadow-md hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] transition-all";

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError("");

    if (!supabase) {
      setAuthError("Supabase is not configured.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    setPassword("");
  };

  const handleSignOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  const handleAddEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session?.user?.id || isSubmitDisabled || !supabase) {
      return;
    }

    setIsSavingEntry(true);
    setEntryError("");

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    const trimmedMood = mood.trim();
    const { data, error } = await supabase
      .from("journal_entries")
      .insert({
        user_id: session.user.id,
        title: trimmedTitle,
        content: trimmedContent.length > 0 ? trimmedContent : null,
        mood: trimmedMood.length > 0 ? trimmedMood : null,
      })
      .select("id, title, content, mood, created_at")
      .single();

    if (error || !data) {
      setEntryError(error?.message ?? "Unable to save entry.");
      setIsSavingEntry(false);
      return;
    }

    const newEntry: JournalEntry = {
      id: data.id as string,
      title: (data.title as string) ?? "",
      content: (data.content as string | null) ?? "",
      mood: (data.mood as string | null) ?? "",
      createdAt: data.created_at as string,
    };

    setEntries((prevEntries) => [newEntry, ...prevEntries]);
    setTitle("");
    setContent("");
    setMood("");
    setIsCreateFormOpen(false);
    setIsSavingEntry(false);
  };

  const startEditingEntry = (entry: JournalEntry) => {
    setEditingEntryId(entry.id);
    setEditTitle(entry.title);
    setEditContent(entry.content);
    setEditMood(entry.mood);
  };

  const cancelEditingEntry = () => {
    setEditingEntryId(null);
    setEditTitle("");
    setEditContent("");
    setEditMood("");
  };

  const handleUpdateEntry = async (entryId: string) => {
    if (!session?.user?.id || !supabase) {
      return;
    }

    const trimmedTitle = editTitle.trim();
    if (trimmedTitle.length < 1) {
      setEntryError("Title must be at least 1 character.");
      return;
    }

    const trimmedContent = editContent.trim();
    const trimmedMood = editMood.trim();

    setIsUpdatingEntryId(entryId);
    setEntryError("");

    const { error } = await supabase
      .from("journal_entries")
      .update({
        title: trimmedTitle,
        content: trimmedContent.length > 0 ? trimmedContent : null,
        mood: trimmedMood.length > 0 ? trimmedMood : null,
      })
      .eq("id", entryId)
      .eq("user_id", session.user.id);

    if (error) {
      setEntryError(error.message);
      setIsUpdatingEntryId(null);
      return;
    }

    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              title: trimmedTitle,
              content: trimmedContent,
              mood: trimmedMood,
            }
          : entry
      )
    );
    setIsUpdatingEntryId(null);
    cancelEditingEntry();
  };

  return (
    <div className="relative z-10 min-h-screen bg-light dark:bg-darkPrimary py-8">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20"
      >
        <div className="flex items-center justify-between gap-3 mb-8">
          <button
            type="button"
            onClick={onClose}
            className={ghostButtonClass}
          >
            ← Back to Portfolio
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-darkLight">Private Journal</h2>
          <div className="w-[140px]" />
        </div>

        {!hasSupabaseConfig ? (
          <p className="text-secondary dark:text-darkTertiary">
            Supabase is not configured. Add REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY.
          </p>
        ) : !session ? (
          <form onSubmit={handleSignIn} className="space-y-4 max-w-xl card dark:bg-darkSecondary rounded-2xl border border-secondary/20 dark:border-darkTertiary/30">
            <p className="text-secondary dark:text-darkTertiary">Sign in to access your private journal.</p>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors"
              required
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button type="submit" className={primaryButtonClass}>
              Sign In
            </button>
          </form>
        ) : (
          <>
            <div className="flex items-center justify-between gap-4 mb-5">
              <p className="text-secondary dark:text-darkTertiary text-sm">Signed in as {session.user.email}</p>
              <button
                type="button"
                onClick={handleSignOut}
                className={ghostButtonClass}
              >
                Sign Out
              </button>
            </div>

            <div className="mb-8 card dark:bg-darkSecondary rounded-2xl border border-secondary/20 dark:border-darkTertiary/30">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="text-lg font-semibold text-primary dark:text-darkLight">Contribution Graph</h3>
                <p className="text-sm text-secondary dark:text-darkTertiary">
                  {heatmapData.pastMonthTextAmount} chars entered in the past month
                </p>
              </div>

              <div
                ref={heatmapScrollContainerRef}
                onWheel={handleHeatmapWheel}
                className="w-full overflow-x-auto no-scrollbar pb-2"
              >
                <div className="inline-flex flex-col gap-2 min-w-max">
                  <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${heatmapData.weeks.length}, 22px)` }}
                  >
                    {heatmapData.monthStarts.map((label, weekIndex) => (
                      <div
                        key={`month-${weekIndex}`}
                        className="text-[10px] leading-none text-secondary dark:text-darkTertiary whitespace-nowrap"
                        title={label ?? undefined}
                      >
                        {label ?? ""}
                      </div>
                    ))}
                  </div>

                  <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${heatmapData.weeks.length}, 22px)` }}
                  >
                  {heatmapData.weeks.map((week, weekIndex) => (
                    <div
                      key={`week-${weekIndex}`}
                      className="grid grid-rows-7 gap-1"
                    >
                      {week.map((day) => (
                        <button
                          type="button"
                          key={day.key}
                          title={`${day.key} • ${day.entries} entries • ${day.textAmount} chars`}
                          onClick={() => {
                            if (!day.inRange) {
                              return;
                            }

                            setSelectedDateKey((currentDateKey) =>
                              currentDateKey === day.key ? null : day.key
                            );
                          }}
                          className={`h-[20px] w-[20px] rounded-sm border border-secondary/15 dark:border-darkTertiary/25 transition-opacity hover:opacity-80 ${getHeatColorClass(
                            day.textAmount,
                            heatmapData.maxTextAmount,
                            day.inRange
                          )} ${day.isToday ? "ring-1 ring-accent dark:ring-darkAccent" : ""} ${selectedDateKey === day.key ? "ring-2 ring-accent dark:ring-darkAccent shadow-[0_0_0_2px_rgba(255,109,31,0.18)]" : ""}`}
                          disabled={!day.inRange}
                        />
                      ))}
                    </div>
                  ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2 text-xs text-secondary dark:text-darkTertiary">
                <span>Less</span>
                <span className="h-3 w-3 rounded-sm bg-secondary/10 dark:bg-darkTertiary/20 border border-secondary/15 dark:border-darkTertiary/25" />
                <span className="h-3 w-3 rounded-sm bg-secondary/35 dark:bg-darkTertiary/40 border border-secondary/15 dark:border-darkTertiary/25" />
                <span className="h-3 w-3 rounded-sm bg-accent/70 dark:bg-darkAccent/70 border border-secondary/15 dark:border-darkTertiary/25" />
                <span className="h-3 w-3 rounded-sm bg-accent dark:bg-darkAccent border border-secondary/15 dark:border-darkTertiary/25" />
                <span>More</span>
              </div>
            </div>

            <div className="mb-8">
              <button
                type="button"
                onClick={() => setIsCreateFormOpen(true)}
                className={primaryButtonClass}
              >
                Write a new entry
              </button>

              <AnimatePresence>
                {isCreateFormOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-darkPrimary/45 px-4"
                    onClick={() => setIsCreateFormOpen(false)}
                  >
                    <motion.form
                      onSubmit={handleAddEntry}
                      initial={{ opacity: 0, y: 16, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      onClick={(event) => event.stopPropagation()}
                      className="w-full max-w-2xl space-y-4 card dark:bg-darkSecondary rounded-2xl border border-secondary/20 dark:border-darkTertiary/30"
                    >
                      <label className="block text-sm font-semibold text-primary dark:text-darkLight">
                        Write a new entry
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Entry title"
                        className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors"
                      />
                      <textarea
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="Write your thoughts (optional)"
                        rows={7}
                        className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                      <input
                        type="text"
                        value={mood}
                        onChange={(event) => setMood(event.target.value)}
                        placeholder="Mood (optional, e.g. Reflective)"
                        className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors"
                      />
                      <div className="flex items-center justify-end gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsCreateFormOpen(false)}
                            className={ghostButtonClass}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitDisabled || isSavingEntry}
                            className={`${primaryButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                          >
                            {isSavingEntry ? "Saving..." : "Save Entry"}
                          </button>
                        </div>
                      </div>
                      {entryError && <p className="text-red-500 text-sm">{entryError}</p>}
                    </motion.form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              {selectedDateKey && (
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-primary dark:text-darkLight">
                    Showing entries for {selectedDateKey}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedDateKey(null)}
                    className={textActionButtonClass}
                  >
                    Show all
                  </button>
                </div>
              )}

              {isLoadingEntries ? (
                <p className="text-secondary dark:text-darkTertiary">Loading entries...</p>
              ) : displayedEntries.length === 0 ? (
                <div className="card dark:bg-darkSecondary rounded-2xl border border-secondary/20 dark:border-darkTertiary/30">
                  <p className="text-secondary dark:text-darkTertiary">No entries for this day.</p>
                </div>
              ) : (
                displayedEntries.map((entry) => (
                  <article
                    key={entry.id}
                    className="card dark:bg-darkSecondary rounded-2xl border border-secondary/20 dark:border-darkTertiary/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <time className="text-sm text-secondary dark:text-darkTertiary">
                        {new Date(entry.createdAt).toLocaleString()}
                      </time>
                      {editingEntryId === entry.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={isUpdatingEntryId === entry.id}
                            onClick={() => handleUpdateEntry(entry.id)}
                            className={`${textActionButtonClass} disabled:opacity-50`}
                          >
                            {isUpdatingEntryId === entry.id ? "Saving..." : "Save"}
                          </button>
                          <button
                            type="button"
                            disabled={isUpdatingEntryId === entry.id}
                            onClick={cancelEditingEntry}
                            className={`${textActionButtonClass} disabled:opacity-50`}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEditingEntry(entry)}
                          className={textActionButtonClass}
                        >
                          Edit
                        </button>
                      )}
                    </div>

                    {editingEntryId === entry.id ? (
                      <div className="mt-3 space-y-3">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(event) => setEditTitle(event.target.value)}
                          className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors"
                        />
                        <textarea
                          value={editContent}
                          onChange={(event) => setEditContent(event.target.value)}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors resize-none"
                        />
                        <input
                          type="text"
                          value={editMood}
                          onChange={(event) => setEditMood(event.target.value)}
                          placeholder="Mood (optional)"
                          className="w-full px-4 py-3 rounded-lg border-2 border-secondary dark:border-darkTertiary bg-light dark:bg-darkSecondary text-primary dark:text-darkLight focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    ) : (
                      <>
                        <h3 className="mt-3 text-lg font-semibold text-primary dark:text-darkLight">{entry.title}</h3>
                        {entry.mood && (
                          <p className="mt-1 text-sm text-secondary dark:text-darkTertiary">Mood: {entry.mood}</p>
                        )}
                        {entry.content && (
                          <p className="mt-3 text-primary dark:text-darkLight whitespace-pre-wrap leading-relaxed">
                            {entry.content}
                          </p>
                        )}
                      </>
                    )}
                  </article>
                ))
              )}
            </div>
          </>
        )}
      </motion.section>
    </div>
  );
}

export default Journal;