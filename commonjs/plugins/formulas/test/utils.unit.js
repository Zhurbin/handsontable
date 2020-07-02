"use strict";

var _utils = require("handsontable/plugins/formulas/utils");

describe('Formulas utils', function () {
  describe('isFormulaExpression', function () {
    it('should correctly detect formula expression', function () {
      expect((0, _utils.isFormulaExpression)()).toBe(false);
      expect((0, _utils.isFormulaExpression)('')).toBe(false);
      expect((0, _utils.isFormulaExpression)('=')).toBe(false);
      expect((0, _utils.isFormulaExpression)('=1')).toBe(true);
      expect((0, _utils.isFormulaExpression)(null)).toBe(false);
      expect((0, _utils.isFormulaExpression)(void 0)).toBe(false);
      expect((0, _utils.isFormulaExpression)('SUM(A1)')).toBe(false);
      expect((0, _utils.isFormulaExpression)('A1')).toBe(false);
      expect((0, _utils.isFormulaExpression)('=A1')).toBe(true);
      expect((0, _utils.isFormulaExpression)('=SUM(A1:A5, SUM(12345))')).toBe(true);
    });
  });
  describe('toUpperCaseFormula', function () {
    it('should correctly upper case formula expression', function () {
      expect(function () {
        (0, _utils.toUpperCaseFormula)();
      }).toThrow();
      expect(function () {
        (0, _utils.toUpperCaseFormula)(null);
      }).toThrow();
      expect(function () {
        (0, _utils.toUpperCaseFormula)(12345);
      }).toThrow();
      expect((0, _utils.toUpperCaseFormula)('12345')).toBe('12345');
      expect((0, _utils.toUpperCaseFormula)('=12345')).toBe('=12345');
      expect((0, _utils.toUpperCaseFormula)('=a1:B15')).toBe('=A1:B15');
      expect((0, _utils.toUpperCaseFormula)('=Sum(23, a55, "a55")')).toBe('=SUM(23, A55, "a55")');
      expect((0, _utils.toUpperCaseFormula)('=COUNTifs(dates, ">="&date(e5, 1, 1), dates, "<="&DATE(E5, 12, 31))')).toBe('=COUNTIFS(DATES, ">="&DATE(E5, 1, 1), DATES, "<="&DATE(E5, 12, 31))');
      expect((0, _utils.toUpperCaseFormula)('=SumIf(range, "text*", SUM_range)')).toBe('=SUMIF(RANGE, "text*", SUM_RANGE)');
      expect((0, _utils.toUpperCaseFormula)('=SumIf(range, \'text*\', SUM_range)')).toBe('=SUMIF(RANGE, \'text*\', SUM_RANGE)');
    });
  });
  describe('isFormulaExpressionEscaped', function () {
    it('should correctly detect escaped formula expressions', function () {
      expect((0, _utils.isFormulaExpressionEscaped)('12345')).toBe(false);
      expect((0, _utils.isFormulaExpressionEscaped)('=12345')).toBe(false);
      expect((0, _utils.isFormulaExpressionEscaped)('\'=12345')).toBe(true);
      expect((0, _utils.isFormulaExpressionEscaped)('\'=a1:B15')).toBe(true);
      expect((0, _utils.isFormulaExpressionEscaped)('=SUM(23, A55, "a55")')).toBe(false);
      expect((0, _utils.isFormulaExpressionEscaped)('\'=SUM(23, A55, "a55")')).toBe(true);
    });
  });
  describe('unescapeFormulaExpression', function () {
    it('should correctly detect escaped formula expressions', function () {
      expect((0, _utils.unescapeFormulaExpression)('12345')).toBe('12345');
      expect((0, _utils.unescapeFormulaExpression)('=12345')).toBe('=12345');
      expect((0, _utils.unescapeFormulaExpression)('\'=12345')).toBe('=12345');
      expect((0, _utils.unescapeFormulaExpression)('\'=a1:B15')).toBe('=a1:B15');
      expect((0, _utils.unescapeFormulaExpression)('=SUM(23, A55, "a55")')).toBe('=SUM(23, A55, "a55")');
      expect((0, _utils.unescapeFormulaExpression)('\'=SUM(23, A55, "a55")')).toBe('=SUM(23, A55, "a55")');
    });
  });
});