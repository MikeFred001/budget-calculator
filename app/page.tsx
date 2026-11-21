"use client";

import { useEffect, useState } from "react";
import BrandMonogram from "./components/BrandMonogram";
import Breakdown from "./components/Breakdown";
import BudgetItemPanel from "./components/BudgetItemPanel";
import type { Preferences } from "./components/BudgetItemPanel";
import DebtItemPanel from "./components/DebtItemPanel";
import {
    addDebt,
    addPayment,
    deleteDebt,
    deletePayment,
    editDebt,
    loadBudget,
    saveIncome,
} from "@/utils/api";
import { formatCalendarDate, monthlyCents, todayDate } from "@/utils/helpers";

type Budget = Awaited<ReturnType<typeof loadBudget>>;
type LoadState =
    | { status: "loading" }
    | { status: "error" }
    | { status: "ready"; budget: Budget };

export default function Home() {
    const [state, setState] = useState<LoadState>({ status: "loading" });
    const [attempt, setAttempt] = useState(0);
    const [today, setToday] = useState("");
    const [preferences, setPreferences] = useState<Preferences>({
        split: false,
        budgetItemsSorted: true,
    });

    useEffect(() => {
        const updateDate = () => setToday(todayDate());
        updateDate();
        const timer = window.setInterval(updateDate, 30_000);
        window.addEventListener("focus", updateDate);
        return () => {
            window.clearInterval(timer);
            window.removeEventListener("focus", updateDate);
        };
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        loadBudget(controller.signal).then(
            (budget) => {
                if (!controller.signal.aborted)
                    setState({ status: "ready", budget });
            },
            () => {
                if (!controller.signal.aborted) setState({ status: "error" });
            },
        );
        return () => controller.abort();
    }, [attempt]);

    function updateBudget(update: (budget: Budget) => Budget) {
        setState((state) =>
            state.status === "ready"
                ? { status: "ready", budget: update(state.budget) }
                : state,
        );
    }

    const budget = state.status === "ready" ? state.budget : undefined;
    const expenses =
        budget?.payments.reduce(
            (sum, payment) => sum + monthlyCents(payment.cost, payment.freq),
            0,
        ) ?? 0;

    return (
        <main className="dashboard">
            <header className="dashboard-header">
                <div className="brand">
                    <span className="brand-mark" aria-hidden="true">
                        <BrandMonogram size={30} color="currentColor" />
                    </span>
                    <div>
                        <h1>Neon Finance</h1>
                        <p>Budget dashboard</p>
                    </div>
                </div>
                {today && (
                    <time className="dashboard-date" dateTime={today}>
                        {formatCalendarDate(today)}
                    </time>
                )}
            </header>

            {budget && today ? (
                <>
                    <Breakdown
                        income={budget.income}
                        expenses={expenses}
                        onIncome={async (value) => {
                            const income = await saveIncome(value);
                            updateBudget((current) => ({ ...current, income }));
                        }}
                    />
                    <BudgetItemPanel
                        payments={budget.payments}
                        today={today}
                        preferences={preferences}
                        onPreferences={setPreferences}
                        onAdd={async (input) => {
                            const payment = await addPayment(input);
                            updateBudget((current) => ({
                                ...current,
                                payments: [...current.payments, payment],
                            }));
                        }}
                        onDelete={async (id) => {
                            await deletePayment(id);
                            updateBudget((current) => ({
                                ...current,
                                payments: current.payments.filter(
                                    (payment) => payment.id !== id,
                                ),
                            }));
                        }}
                    />
                    <DebtItemPanel
                        debts={budget.debts}
                        onAdd={async (input) => {
                            const debt = await addDebt(input);
                            updateBudget((current) => ({
                                ...current,
                                debts: [...current.debts, debt],
                            }));
                        }}
                        onEdit={async (input) => {
                            const debt = await editDebt(input);
                            updateBudget((current) => ({
                                ...current,
                                debts: current.debts.map((entry) =>
                                    entry.id === debt.id ? debt : entry,
                                ),
                            }));
                        }}
                        onDelete={async (id) => {
                            await deleteDebt(id);
                            updateBudget((current) => ({
                                ...current,
                                debts: current.debts.filter(
                                    (debt) => debt.id !== id,
                                ),
                            }));
                        }}
                    />
                </>
            ) : state.status === "error" ? (
                <section className="panel load-state">
                    <div role="alert">
                        <h2>Budget unavailable</h2>
                        <p className="secondary">
                            Couldn’t load your budget. Check that the budget
                            server is running and try again.
                        </p>
                    </div>
                    <button
                        className="button button-primary"
                        type="button"
                        onClick={() => {
                            setState({ status: "loading" });
                            setAttempt((value) => value + 1);
                        }}
                    >
                        Try again
                    </button>
                </section>
            ) : (
                <p className="panel load-state" role="status">
                    Loading your budget…
                </p>
            )}
        </main>
    );
}
