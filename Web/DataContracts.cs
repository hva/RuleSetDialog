using System;

namespace Web
{
	[Serializable]
	public class RuleSetContract
	{
		public string Chaining { get; set; }
		public RuleContract[] Rules { get; set; }
	}

	[Serializable]
	public class RuleContract
	{
		public string Name { get; set; }
		public string Priority { get; set; }
		public string Reevaluation { get; set; }
		public string Active { get; set; }
		public string Condition { get; set; }
		public string[] ThenActions { get; set; }
		public string[] ElseActions { get; set; }
	}
}