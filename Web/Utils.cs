using System;
using System.Linq;
using System.Workflow.Activities.Rules;

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
				Priority = rule.Priority.ToString(),
				Reevaluation = Enum.GetName(typeof(RuleReevaluationBehavior), rule.ReevaluationBehavior),
				Active = rule.Active,
				Condition = rule.Condition.ToString(),
				ThenActions = rule.ThenActions.Select(x => x.ToString()).ToArray(),
				ElseActions = rule.ElseActions.Select(x => x.ToString()).ToArray(),
			};
		}

		public static RuleSet Deserialize(this RuleSetContract contract) {
			return new RuleSet {
				ChainingBehavior = (RuleChainingBehavior)Enum.Parse(typeof(RuleChainingBehavior), contract.Chaining),
			};
		}

	}

}