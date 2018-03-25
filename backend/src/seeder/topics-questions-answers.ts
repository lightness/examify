import { DeepPartial } from "typeorm";

import { Topic } from "../modules/topic/topic.entity";


export const TOPICS: DeepPartial<Topic>[] = [
    {
        title: "Элементарная математика",
        theory: "Here should be some theory",
        questions: [
            {
                text: "Какую цифру надо поставить вместо точки 2468.13579, чтобы полученное число делилось на 9 нацело?",
                answers: [
                    { text: "4", isCorrect: false },
                    { text: "0", isCorrect: true },
                    { text: "7", isCorrect: false },
                    { text: "8", isCorrect: false },
                ]
            },
            {
                text: "Сколько секунд содержится в 1 часе 160 минутах и 2 секундах?",
                answers: [
                    { text: "13202", isCorrect: true },
                    { text: "12202", isCorrect: false },
                    { text: "14202", isCorrect: false },
                    { text: "106002", isCorrect: false },
                ]
            },
            {
                text: "Дано несколько натуральных чисел, сумма которых равна 77. Если каждое из этих чисел уменьшить на 4, то сумма новых чисел будет равна 53. Сколько чисел было дано?",
                answers: [
                    { text: "4", isCorrect: false },
                    { text: "6", isCorrect: true },
                    { text: "8", isCorrect: false },
                    { text: "12", isCorrect: false },
                ]
            },
            {
                text: "При делении натурального числа на 18 в частном получили 14 и в остатке 11. Чему равно делимое?",
                answers: [
                    { text: "173", isCorrect: false },
                    { text: "243", isCorrect: false },
                    { text: "253", isCorrect: false },
                    { text: "263", isCorrect: true },
                ]
            },
            {
                text: "Сколько секунд содержат двое суток?",
                answers: [
                    { text: "136000", isCorrect: false },
                    { text: "232400", isCorrect: false },
                    { text: "172800", isCorrect: true },
                    { text: "126600", isCorrect: false },
                ]
            }
        ]
    },
    {
        title: "Математический анализ",
        theory: "Here should be some theory",
        questions: [
            {
                text: "Решите неравенство 2 * (х - 1)(х + 1) - х(х + 3) < 2 - 3х.",
                answers: [
                    { text: "(-2;2)", isCorrect: true },
                    { text: "(-∞; 2)", isCorrect: false },
                    { text: "(0;4)", isCorrect: false },
                    { text: "(1;∞)", isCorrect: false },
                ]
            },
            {
                text: "Найдите сумму всех целых решений неравенства: (x – 4) / (2x + 6) ≤ 0.",
                answers: [
                    { text: "8", isCorrect: false },
                    { text: "6", isCorrect: false },
                    { text: "7", isCorrect: true },
                    { text: "5", isCorrect: false },
                ]
            },
            {
                text: "Решите неравенство: |х - 4| > |х + 4|.",
                answers: [
                    { text: "(-∞; 0)", isCorrect: true },
                    { text: "(-4; ∞)", isCorrect: false },
                    { text: "(0; 4) U (4; ∞)", isCorrect: false },
                    { text: "(-4; 4)", isCorrect: false },
                ]
            },
            {
                text: "Сколько всего дробей со знаменателем 33, которые больше 9/11 и меньше 1?",
                answers: [
                    { text: "1", isCorrect: false },
                    { text: "5", isCorrect: true },
                    { text: "6", isCorrect: false },
                    { text: "2", isCorrect: false },
                ]
            },
            {
                text: "При каких значениях у значения дроби (2y + 1) / 3 принадлежат промежутку (-1; 5/3)?",
                answers: [
                    { text: "(-1/2;1)", isCorrect: false },
                    { text: "(-1;2)", isCorrect: false },
                    { text: "(-2;2)", isCorrect: true },
                    { text: "(0;2)", isCorrect: false },
                ]
            }
        ]
    },
    {
        title: "Геометрия",
        theory: "Here should be some theory",
        questions: []
    },
    {
        title: "Тригонометрия",
        theory: "Here should be some theory",
        questions: [
            {
                text: "Упростите: (sin4a – sin6a) : (cos5a*sina).",
                answers: [
                    { text: "-2", isCorrect: true },
                    { text: "2sina", isCorrect: false },
                    { text: "-2sina", isCorrect: false },
                    { text: "-2cosa", isCorrect: false },
                ]
            },
            {
                text: "Упростите: 4 : (ctga – tga).",
                answers: [
                    { text: "tg2a", isCorrect: false },
                    { text: "ctg2a", isCorrect: false },
                    { text: "2tg2a", isCorrect: true },
                    { text: "sin2a", isCorrect: false },
                ]
            },
            {
                text: "Упростите: cos3a/cosa - sin3a/sina.",
                answers: [
                    { text: "2", isCorrect: false },
                    { text: "2sina", isCorrect: false },
                    { text: "2cosa", isCorrect: false },
                    { text: "-2", isCorrect: true },
                ]
            },
            {
                text: "В каком ответе знаки cos870°, sin(-490)° и tg670° приведены в порядке их написания?",
                answers: [
                    { text: "-,+,-", isCorrect: false },
                    { text: "+,-,-", isCorrect: false },
                    { text: "-,-,+", isCorrect: false },
                    { text: "-,-,-", isCorrect: true },
                ]
            },
            {
                text: " Найдите tgа, если tg(π/4 - а) = 1/3.",
                answers: [
                    { text: "1/2", isCorrect: true },
                    { text: "-3", isCorrect: false },
                    { text: "1/3", isCorrect: false },
                    { text: "3", isCorrect: false },
                ]
            }
        ]
    }
];
