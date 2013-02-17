using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Workflow.Activities.Rules;
using Original;

namespace Web
{
	public static class Utils
	{
		public static RuleSetContract Serialize(this RuleSet ruleSet)
		{
			return new RuleSetContract {
				Chaining = Enum.GetName(typeof(RuleChainingBehavior), ruleSet.ChainingBehavior),
				Rules = ruleSet.Rules.Select(x => x.Serialize()).ToArray(),
			};
		}

		public static RuleContract Serialize(this Rule rule)
		{
			return new RuleContract {
				Name = rule.Name,
				Priority = rule.Priority,
				Reevaluation = Enum.GetName(typeof(RuleReevaluationBehavior), rule.ReevaluationBehavior),
				Active = rule.Active,
				Condition = rule.Condition.ToString(),
				ThenActions = rule.ThenActions.Select(x => x.ToString()).ToArray(),
				ElseActions = rule.ElseActions.Select(x => x.ToString()).ToArray(),
			};
		}

		public static RuleSet Deserialize(this RuleSetContract contract) {
			RuleSet ruleSet = new RuleSet {
				ChainingBehavior = (RuleChainingBehavior)Enum.Parse(typeof(RuleChainingBehavior), contract.Chaining),
			};
			foreach (RuleContract rule in contract.Rules) {
				ruleSet.Rules.Add(rule.Deserialize());
			}
			return ruleSet;
		}

		public static Rule Deserialize(this RuleContract contract) {

			Assembly ruleAssembly = typeof(Rule).Assembly;
			Type parserType = ruleAssembly.GetType("System.Workflow.Activities.Rules.Parser");

			RuleValidation validation = new RuleValidation(typeof(Person), null);
			var internalRuleParser = Activator.CreateInstance(parserType, BindingFlags.Instance | BindingFlags.NonPublic, null, new object[] { validation }, null);

			var parseConditionMethodInfo = parserType.GetMethod("ParseCondition", BindingFlags.Instance | BindingFlags.NonPublic);
			RuleExpressionCondition condition = parseConditionMethodInfo.Invoke(internalRuleParser, new object[] { contract.Condition }) as RuleExpressionCondition;

			Rule rule = new Rule {
				Name = contract.Name,
				Priority = contract.Priority,
				ReevaluationBehavior = (RuleReevaluationBehavior)Enum.Parse(typeof(RuleReevaluationBehavior), contract.Reevaluation),
				Active = contract.Active,
				Condition = condition,
			};

			var parseSingleStatementMethodInfo = parserType.GetMethod("ParseSingleStatement", BindingFlags.Instance | BindingFlags.NonPublic);

			foreach (string str in contract.ThenActions) {
				RuleAction action = parseSingleStatementMethodInfo.Invoke(internalRuleParser, new object[] { str }) as RuleAction;
				rule.ThenActions.Add(action);
			}

			var parseStatementListMethodInfo = parserType.GetMethod("ParseStatementList", BindingFlags.Instance | BindingFlags.NonPublic);
			IList<RuleAction> elseActions = parseStatementListMethodInfo.Invoke(internalRuleParser, new object[] { string.Join("\n", contract.ElseActions) }) as IList<RuleAction>;
			if (elseActions != null) {
				foreach (RuleAction action in elseActions) {
					rule.ElseActions.Add(action);
				}
			}

			return rule;
		}
	}
}