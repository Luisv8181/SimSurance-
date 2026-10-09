#!/usr/bin/env python3
"""Dependency-free smoke checks for the static SimSurance Learning Lab."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "learning-lab" / "index.html"

class LearningLabSmokeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = PAGE.read_text(encoding="utf-8")

    def test_page_exists_and_has_language_and_viewport(self):
        self.assertTrue(PAGE.exists())
        self.assertIn('<html lang="en">', self.html)
        self.assertIn('name="viewport"', self.html)

    def test_core_sections_exist(self):
        for section in ("id=\"start\"", "id=\"lessons\"", "id=\"try-it\"", "id=\"case-access\"", "id=\"case-capacity\"", "id=\"glossary\""):
            with self.subTest(section=section):
                self.assertIn(section, self.html)

    def test_toy_values_are_explicitly_illustrative(self):
        self.assertIn("ILLUSTRATIVE CALCULATION", self.html)
        self.assertIn("not Pennsylvania reimbursement rates", self.html)
        self.assertIn("fictional plan rule", self.html)

    def test_interactive_logic_is_present(self):
        self.assertIn("function updateAmount()", self.html)
        self.assertIn("data-level", self.html)
        self.assertIn("data-case", self.html)

    def test_internal_links_have_targets(self):
        hrefs = re.findall(r'href="#([^"]+)"', self.html)
        ids = set(re.findall(r'\bid="([^"]+)"', self.html))
        for href in hrefs:
            with self.subTest(target=href):
                self.assertIn(href, ids)

    def test_labels_reference_existing_controls(self):
        labels = re.findall(r'<label[^>]*for="([^"]+)"', self.html)
        ids = set(re.findall(r'\bid="([^"]+)"', self.html))
        for label_for in labels:
            with self.subTest(control=label_for):
                self.assertIn(label_for, ids)

    def test_money_flow_lesson_exists(self):
        money_page = ROOT / "learning-lab" / "money-flow.html"
        self.assertTrue(money_page.exists())
        content = money_page.read_text(encoding="utf-8")
        self.assertIn("The double-counting trap", content)
        self.assertIn("data-lens", content)
        self.assertIn("Fictional values only", content)

if __name__ == "__main__":
    unittest.main()
